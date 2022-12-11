package com.zachwattz.jksa.kafka_streams;

import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;

import com.corundumstudio.socketio.SocketIOServer;
import com.zachwattz.jksa.models.DataOperation;
import com.zachwattz.jksa.models.MessageDatagram;

public class KafkaStreamsObject implements DataOperation {

    private String topic, socketIOEventName;

    private SocketIOServer socketIOServerInstance;
    private StreamsBuilder streamsBuilder;
    private KafkaStreamsManagerInstance parent;
    private KStream<String, String> kStream;
    private KafkaStreams kafkaStreams;

    public KafkaStreamsObject(KafkaStreamsManagerInstance parent, String assignedTopic) {
        this.parent = parent;
        this.topic = assignedTopic;
        this.streamsBuilder = new StreamsBuilder();
    }

    public void bindSocketIO(SocketIOServer server, String eventName) {
        this.socketIOEventName = eventName;
        this.socketIOServerInstance = server;
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
        this.kafkaStreams.start();
        System.out.printf("\n\n[TEST] %s started", this.socketIOEventName);
    }

    public void stopStream() {
        this.kafkaStreams.close();
    }

    public void execute(String key, String value) {
        this.socketIOServerInstance
                .getBroadcastOperations()
                    .sendEvent(this.socketIOEventName, new MessageDatagram(key, value));
    }
}
