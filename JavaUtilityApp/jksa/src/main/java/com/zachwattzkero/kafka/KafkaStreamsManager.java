package com.zachwattzkero.kafka;

import java.util.ArrayList;
import java.util.List;

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
        Logger.getRootLogger().setLevel(Level.INFO);

        this.debugEnabled = enableDebug;
        this.brokerAddress = brokerAddress;
        this.dataSerde = Serdes.String();
        this.streamsList = new ArrayList<>();
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

    public void terminateService() {
        this.kAdminClient.closeClient();
        this.streamsList.forEach((stream) -> stream.stopStream());
        this.streamsList.clear();
        if (this.debugEnabled) System.out.println("[KafkaStreamsManager] Shutdown procedure completed.");
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
