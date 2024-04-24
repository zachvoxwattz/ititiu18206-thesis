package com.zachwattzkero;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.zachwattzkero.kafka.KafkaStreamsManager;
import com.zachwattzkero.socketio.PortChecker;

/**
 * Unit test for simple App.
 */
public class JKSAppTest {
    @Test
    public void socketIOPortShouldOpen() {
        assertTrue(PortChecker.isAvailable(3004));
    }

    @Test
    public void topicsStreamsAreCreated() {
        // Remember to change the address broker domain for different machines!
        String addressBroker = "localhost:9091";
        KafkaStreamsManager streamsManager = new KafkaStreamsManager(addressBroker, false);
        streamsManager.createAndStartTopicStreams();
        
        int topicCount = streamsManager.getAdminClient().getTopicList().size();
        int streamsCount = streamsManager.getActiveStreams().size();

        assertTrue(topicCount == streamsCount);
        streamsManager.terminateService();
    }
}
