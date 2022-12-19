package com.zachwattzkero.kafka;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import com.zachwattzkero.socketio.SocketIOBroadcaster;

public class KafkaStreamsManager {
    private int TOPIC_CHANGE_LISTENER_DELAY = 2500; // in MILLISECONDS!
    private int STREAM_COUNT = 0;
    private boolean debugEnabled;
    private String brokerAddress;

    private Runnable topicChangeListener;
    private Serde<String> dataSerde;
    private KafkaAdminClient kAdminClient;
    private SocketIOBroadcaster socketIOBroadcaster;
    private ScheduledExecutorService ses;
    private List<KafkaStreamInstance> streamsList;

    public KafkaStreamsManager(String brokerAddress, boolean enableDebug) {
        BasicConfigurator.configure();
        Logger.getRootLogger().setLevel(Level.OFF);

        this.debugEnabled = enableDebug;
        this.brokerAddress = brokerAddress;
        this.dataSerde = Serdes.String();
        this.streamsList = new ArrayList<>();
        this.ses = Executors.newScheduledThreadPool(1);
        this.kAdminClient = new KafkaAdminClient(brokerAddress, this.debugEnabled);

        attachTopicChangeListener();
        if (this.debugEnabled) System.out.printf("[KafkaStreamsManager] Manager initialized\n");
    }

    private void attachTopicChangeListener() {
        this.topicChangeListener = new Runnable() {
            public void run() {
                List<String> fetchedTopicList = kAdminClient.getTopicList();
                List<String> currentTopicList = new ArrayList<>();
                int fetchedSize = fetchedTopicList.size();
                int currentSize = currentTopicList.size();
                streamsList.forEach((stream) -> currentTopicList.add(stream.getAssignedTopic()));

                if (fetchedSize == currentSize) {
                
                    Iterator<String> topicItor = fetchedTopicList.iterator();
                    boolean shouldHandleChange = false;

                    while (topicItor.hasNext()) {
                        String currentItorTopic = topicItor.next();

                        if (!currentTopicList.contains(currentItorTopic)) {
                            shouldHandleChange = true;
                            break;        
                        }
                    }

                    if (shouldHandleChange) {
                        handleTopicChanges(fetchedTopicList, currentTopicList);
                    }
                }
                else {
                    handleTopicChanges(fetchedTopicList, currentTopicList);
                }
            }
        };

        this.ses.scheduleWithFixedDelay(
            this.topicChangeListener, 
            this.TOPIC_CHANGE_LISTENER_DELAY, 
            this.TOPIC_CHANGE_LISTENER_DELAY, 
            TimeUnit.MILLISECONDS
        );
    }

    public KafkaStreamInstance createNewStream(String assignedTopic) {
        KafkaStreamInstance objectInstance = new KafkaStreamInstance(this, assignedTopic, String.valueOf(STREAM_COUNT), this.debugEnabled);
        objectInstance.initStream();
        
        STREAM_COUNT++;
        this.streamsList.add(objectInstance);
        return objectInstance;
    }

    public void createAndStartNewStream(String assignedTopic) {
        createNewStream(assignedTopic).startStream();
    }

    public void createAndStartTopicStreams() {
        List<String> topics = this.kAdminClient.getTopicList();
        
        if (topics.size() == 0) {
            System.out.println("[KafkaStreamsManager] No topic found in designated broker. Create some and run the function again!");
            return;
        }

        topics.forEach((topic) -> createAndStartNewStream(topic));
    }

    public void broadcastEvent(String eventName, String key, String value) {
        this.socketIOBroadcaster.broadcastEvent(eventName, key, value);
    }

    public void startTargetStream(KafkaStreamInstance targetStream) {
        targetStream.startStream();
    }

    protected void handleTopicChanges(List<String> fetchedTopics, List<String> currentTopics) {
        // Check whether current topics exist in fetched topics list. If not, stop and delete the stream.
        currentTopics.forEach((topic) -> {
            if (!fetchedTopics.contains(topic)) {
                KafkaStreamInstance targetInstance = getInstanceByTopic(topic);
                
                targetInstance.stopStream("Topic no longer exists, stopping the stream");
                streamsList.remove(targetInstance);
                if (this.debugEnabled) System.out.println("[KafkaStreamsManager] Shutdown an instance as the assigned topic doesn't no longer exist.");
            }
        });

        // Check wheter fetched topics exist in current topic. If not, create and start the stream.
        fetchedTopics.forEach((topic) -> {
            if (!currentTopics.contains(topic)) {
                createAndStartNewStream(topic);
                if (this.debugEnabled) System.out.println("[KafkaStreamsManager] Created a new instance as a new topic has been detected.");
            }
        });
    }

    public void terminateService() {
        this.ses.shutdown();
        this.kAdminClient.closeClient();
        this.streamsList.forEach((stream) -> stream.stopStream());
        this.streamsList.clear();
        if (this.debugEnabled) System.out.println("[KafkaStreamsManager] Shutdown procedure completed.");
    }

    private KafkaStreamInstance getInstanceByTopic(String inputTopic) {
        KafkaStreamInstance returnObject = null;
        Iterator<KafkaStreamInstance> iter = this.streamsList.iterator();

        while (iter.hasNext()) {
            KafkaStreamInstance targetInstance = iter.next();

            if (targetInstance.getAssignedTopic().equals(inputTopic)) {
                returnObject = targetInstance;
                break;
            }
        }
        return returnObject;
    }
    
    public void bindSocketIOServer(SocketIOBroadcaster instance) { this.socketIOBroadcaster = instance; }
    public int getStreamCount() { return this.STREAM_COUNT; }
    public String getBrokerAddress() { return this.brokerAddress; }
    public boolean isDebugEnabled() { return this.debugEnabled; }
    public Serde<String> getDataSerde() { return this.dataSerde; }
    public StreamsBuilder getStreamsBuilder() { return new StreamsBuilder(); }
    public KafkaAdminClient getAdminClient() { return this.kAdminClient; }
    public SocketIOBroadcaster getSocketIOBroadcaster() { return this.socketIOBroadcaster; }
}
