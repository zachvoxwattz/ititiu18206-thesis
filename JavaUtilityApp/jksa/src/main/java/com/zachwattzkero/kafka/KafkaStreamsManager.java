package com.zachwattzkero.kafka;

import java.util.ArrayList;
import java.util.List;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;

public class KafkaStreamsManager {

    private int STREAM_COUNT = 0;
    private boolean debugEnabled;
    private String brokerAddress;

    private Serde<String> dataSerde;
    private KafkaAdminClient kAdminClient;
    private List<KafkaStreamInstance> streamsList;

    public KafkaStreamsManager(String brokerAddress, boolean enableDebug) {
        BasicConfigurator.configure();
        Logger.getRootLogger().setLevel(Level.INFO);

        this.debugEnabled = enableDebug;
        this.brokerAddress = brokerAddress;
        this.dataSerde = Serdes.String();
        this.streamsList = new ArrayList<>();
        this.kAdminClient = new KafkaAdminClient(brokerAddress);
    }

    public KafkaStreamInstance createNewStream(String assignedTopic) {
        KafkaStreamInstance objectInstance = new KafkaStreamInstance(this, assignedTopic, String.valueOf(STREAM_COUNT));
        objectInstance.initStream();
        
        STREAM_COUNT++;
        this.streamsList.add(objectInstance);
        return objectInstance;
    }

    public void createAndStartNewStream(String assignedTopic) {
        createNewStream(assignedTopic).startStream();
    }

    public void startTargetStream(KafkaStreamInstance targetStream) {
        targetStream.startStream();
    }

    public void terminateService() {
        this.kAdminClient.closeClient();
        this.streamsList.forEach((stream) -> stream.stopStream());
        this.streamsList.clear();
    }

    public int getStreamCount() { return this.STREAM_COUNT; }
    public boolean isDebugEnabled() { return this.debugEnabled; }
    public String getBrokerAddress() { return this.brokerAddress; }
    public Serde<String> getDataSerde() { return this.dataSerde; }
    public KafkaAdminClient getAdminClient() { return this.kAdminClient; }
}
