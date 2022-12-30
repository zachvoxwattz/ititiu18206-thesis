package com.zachwattzkero.kafka;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

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
    private List<KafkaStreamInstance> streamsList;

    public KafkaStreamsManager(String brokerAddress, boolean enableDebug) {
        BasicConfigurator.configure();
        Logger.getRootLogger().setLevel(Level.OFF);

        this.debugEnabled = enableDebug;
        this.brokerAddress = brokerAddress;
        this.dataSerde = Serdes.String();
        this.streamsList = new ArrayList<>();
        this.kAdminClient = new KafkaAdminClient(this.brokerAddress, this.debugEnabled);

        System.out.printf("[KafkaStreamsManager] Info: Manager initialized\n");
    }

    public KafkaStreamInstance createNewStream(String assignedTopic) {
        var objectInstance = new KafkaStreamInstance(this, assignedTopic, ++STREAM_COUNT, this.debugEnabled);

        objectInstance.initStream();
        this.streamsList.add(objectInstance);
        return objectInstance;
    }

    public void createAndStartNewStream(String assignedTopic) {
        createNewStream(assignedTopic).startStream();
    }

    public void createAndStartTopicStreams() {
        List<String> topics = this.kAdminClient.getTopicList();
        var cmdLoopEnabled = false;
        Scanner inputScanner = null;

        if (topics.isEmpty()) {
            System.out.printf("\n\n[KafkaStreamsManager] Error: No topic discovered in target broker!");
            System.out.printf("\nType 'retry' to make another attempt");
            System.out.printf("\n> ");
            cmdLoopEnabled = true;
            inputScanner = new Scanner(System.in);
        }

        while (cmdLoopEnabled) {
            var inputStr = inputScanner.next();

            if (inputStr.equals("retry")) {
                System.out.printf("\n[KafkaStreamsManager] Info: Retrying to find topics...");
                topics = this.kAdminClient.getTopicList();

                if (topics.isEmpty()) {
                    System.out.printf("\n[KafkaStreamsManager] Notice: No topic discovered in target broker!");
                    System.out.printf("\nType 'retry' to make another attempt");
                    System.out.printf("\n> ");
                }

                else {
                    inputScanner.close();
                    System.out.printf("\n[KafkaStreamsManager] Info: Found %d topic(s). Progressing services...\n", topics.size());
                    break;
                }
            }
            else {
                System.out.printf("\n[KafkaStreamsManager] Error: Wrong request parameter! Please try again");
                System.out.printf("\n> ");
            }
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
            var currentPointTopic = currentTopicIterator.next();

            if (!fetchedTopics.contains(currentPointTopic)) {
                var targetInstance = getInstanceByTopic(currentPointTopic);
                
                targetInstance.stopStream("Current topic no longer exists, stopping the stream");
                streamsList.remove(targetInstance);
                shutdownCount++;
            }
        }
        
        // Check wheter fetched topics exist in current topic. If not, create and start the stream.
        if (!fetchedTopics.isEmpty()) {
            currentTopicIterator = fetchedTopics.iterator();
            while (currentTopicIterator.hasNext()) {
                var currentPointTopic = currentTopicIterator.next();

                if (!currentTopics.contains(currentPointTopic)) {
                    createAndStartNewStream(currentPointTopic);
                    createCount++;
                }
            }
        }

        System.out.printf("[KafkaStreamsManager] Info: Synced topics with Cluster. Shut down %s expired stream(s) and started %d new stream(s)\n", shutdownCount, createCount);

        if (fetchedTopics.isEmpty()) createAndStartTopicStreams();
    }

    public void terminateService() {
        this.kAdminClient.closeClient();
        this.streamsList.forEach((stream) -> stream.stopStream());
        this.streamsList.clear();
        System.out.println("[KafkaStreamsManager] Info: Shutdown procedure completed.");
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
