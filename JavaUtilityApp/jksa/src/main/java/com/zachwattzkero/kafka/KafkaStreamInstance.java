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
    
    private String assignedTopic, streamID;

    private StreamsBuilder streamsBuilder;
    private KafkaStreams kafkaStream;
    private KafkaStreamsManager managerParent;
    private Serde<String> dataSerde;
    private KStream<String, String> kStream;
    private Properties props;

    public KafkaStreamInstance(KafkaStreamsManager parent, String givenTopic) {
        this.managerParent = parent;
        this.assignedTopic = givenTopic;
        this.streamID = "KafkaStreamCL_" + "0";
    }

    public KafkaStreamInstance(KafkaStreamsManager parent, String givenTopic, String assignedStreamID) {
        this.managerParent = parent;
        this.assignedTopic = givenTopic;
        this.streamID = "KafkaStreamCL_" + assignedStreamID;
    }

    public void initStream() {
        this.props = new Properties();
            this.props.putIfAbsent(StreamsConfig.APPLICATION_ID_CONFIG, streamID);
            this.props.putIfAbsent(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, this.managerParent.getBrokerAddress());

        this.streamsBuilder = new StreamsBuilder();
        this.dataSerde = this.managerParent.getDataSerde();
        this.kStream = this.streamsBuilder.stream(
            this.assignedTopic,
            Consumed.with(this.dataSerde, this.dataSerde)
        );

        this.kStream.foreach((key, value) -> execute(key, value));
    }

    @Override
    public void execute(String key, String value) {
        if (this.managerParent.isDebugEnabled()) System.out.printf("\n\n[%s RESULT DATA]\n - Key: '%s'\n - Value: '%s'\n\n", this.streamID, key, value);
    }

    public void startStream() {
        this.kafkaStream = new KafkaStreams(this.streamsBuilder.build(), this.props);
        this.kafkaStream.start();
    }

    public void stopStream() {
        this.kafkaStream.close();
    }
}
