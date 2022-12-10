package com.zachwattz.jksa.kafka_streams;

import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;

import com.zachwattz.jksa.models.DataOperation;
import java.util.concurrent.CountDownLatch;

public class KafkaStreamsObject implements DataOperation {

    private String topic;
    private CountDownLatch CDL;

    private StreamsBuilder streamsBuilder;
    private KafkaStreamsManagerInstance parent;
    private KStream<String, String> kStream;
    private KafkaStreams kafkaStreams;

    public KafkaStreamsObject(KafkaStreamsManagerInstance parent, String assignedTopic) {
        this.parent = parent;
        this.topic = assignedTopic;
        this.streamsBuilder = new StreamsBuilder();
    }

    public void initializeStream() {
        this.kStream = this.streamsBuilder.stream(
            this.topic, 
            Consumed.with(this.parent.getKeySerde(), this.parent.getValueSerde())
        );

        this.kStream.foreach((key, value) -> execute(key, value));
        this.kafkaStreams = new KafkaStreams(this.streamsBuilder.build(), this.parent.getProperties());
    }

    public void startStream() {
        this.CDL = new CountDownLatch(1);
        try {
            this.kafkaStreams.start();
            this.CDL.await();
        } catch (final Throwable e) {
            System.exit(1);
        }
    }

    public void stopStream() {
        this.kafkaStreams.close();
        this.CDL.countDown();
    }

    public void execute(String key, String value) {
        // TODO
    }
}
