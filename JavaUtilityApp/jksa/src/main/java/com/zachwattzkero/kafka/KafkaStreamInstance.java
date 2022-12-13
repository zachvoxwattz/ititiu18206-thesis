package com.zachwattzkero.kafka;

import java.util.Properties;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;

import com.zachwattzkero.models.DataOperation;

public class KafkaStreamInstance implements DataOperation {
    
    private String assignedTopic, streamID, broadcastEventName;
    private boolean debugEnabled;

    private Properties props;
    private Serde<String> dataSerde;
    private KafkaStreams kafkaStream;
    private StreamsBuilder streamsBuilder;
    private KafkaStreamsManager managerParent;
    private KStream<String, String> kStream;

    public KafkaStreamInstance(KafkaStreamsManager parent, String givenTopic, String assignedStreamID) {
        this.managerParent = parent;
        this.assignedTopic = givenTopic;
        this.debugEnabled = false;
        this.broadcastEventName = "sv_broadcast_" + this.assignedTopic;
        this.streamID = "KafkaStreamCL_" + assignedStreamID;
    }

    public KafkaStreamInstance(KafkaStreamsManager parent, String givenTopic, String assignedStreamID, boolean enableDebug) {
        this.managerParent = parent;
        this.assignedTopic = givenTopic;
        this.debugEnabled = enableDebug;
        this.broadcastEventName = "sv_broadcast_" + this.assignedTopic;
        this.streamID = "KafkaStreamCL_" + assignedStreamID;
    }

    public void initStream() {
        this.props = new Properties();
            this.props.putIfAbsent(StreamsConfig.APPLICATION_ID_CONFIG, streamID);
            this.props.putIfAbsent(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, this.managerParent.getBrokerAddress());

        this.streamsBuilder = this.managerParent.getStreamsBuilder();
        this.dataSerde = this.managerParent.getDataSerde();
        this.kStream = this.streamsBuilder.stream(
            this.assignedTopic,
            Consumed.with(this.dataSerde, this.dataSerde)
        );

        this.kStream.foreach((key, value) -> execute(key, value));
        if (this.debugEnabled) System.out.printf("[KafkaStreamInstance '%s'] Initialized\n", this.streamID);
    }

    @Override
    public void execute(String key, String value) {
        String processedKey = processKey(key);
        if (this.managerParent.isDebugEnabled()) {
            System.out.printf("\n\n[%s RESULT DATA]\n - Key: %s\n - Value: %s\n\n", this.streamID, processedKey, value);
        }

        this.managerParent.broadcastEvent(this.broadcastEventName, processedKey, value);
    }

    private String processKey(String key) {
        String returnedKey = key;
        if (key.charAt(0) == '\"' && key.charAt(key.length() - 1) == '\"') {
            returnedKey = key.substring(1, key.length() - 1);
        }

        return returnedKey;
    }

    public void startStream() {
        this.kafkaStream = new KafkaStreams(this.streamsBuilder.build(), this.props);
        this.kafkaStream.start();
        if (this.debugEnabled) System.out.printf("[KafkaStreamInstance '%s'] Started execution\n", this.streamID);
    }

    public void stopStream() {
        this.kafkaStream.close();
        if (this.debugEnabled) System.out.printf("[KafkaStreamInstance '%s'] Stopped execution\n", this.streamID);
    }
}
