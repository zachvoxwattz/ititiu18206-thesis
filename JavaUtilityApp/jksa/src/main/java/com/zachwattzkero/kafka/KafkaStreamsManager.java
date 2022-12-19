package com.zachwattzkero.kafka;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import com.zachwattzkero.socketio.SocketIOBroadcaster;

public class KafkaStreamsManager {
    private int STREAM_COUNT = 0;
    private boolean debugEnabled;
    private String brokerAddress;

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

        if (this.debugEnabled) System.out.printf("[KafkaStreamsManager] Manager initialized\n");
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

    public void handleTopicChanges() {
        var shutdownCount = 0;
        var createCount = 0;
        List<String> fetchedTopics = this.kAdminClient.getTopicList();
        List<String> currentTopics = new ArrayList<>();
        streamsList.forEach((stream) -> currentTopics.add(stream.getAssignedTopic()));

        // Check whether current topics exist in fetched topics. If not, stop and remove the stream.
        Iterator<String> currentTopicIterator = currentTopics.iterator();
        while (currentTopicIterator.hasNext()) {
            String currentPointTopic = currentTopicIterator.next();

            if (!fetchedTopics.contains(currentPointTopic)) {
                KafkaStreamInstance targetInstance = getInstanceByTopic(currentPointTopic);
                
                targetInstance.stopStream("Topic no longer exists, stopping the stream");
                streamsList.remove(targetInstance);
                shutdownCount++;
            }
        }
        
        // Check wheter fetched topics exist in current topic. If not, create and start the stream.
        currentTopicIterator = fetchedTopics.iterator();
        while (currentTopicIterator.hasNext()) {
            String currentPointTopic = currentTopicIterator.next();

            if (!currentTopics.contains(currentPointTopic)) {
                createAndStartNewStream(currentPointTopic);
                createCount++;
            }
        }

        if (this.debugEnabled) System.out.printf("[KafkaStreamsManager] Synced topics with Cluster. Shut down %s expired stream(s) and started %d new stream(s)\n", shutdownCount, createCount);
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
