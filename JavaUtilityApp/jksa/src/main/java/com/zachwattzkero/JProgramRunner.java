package com.zachwattzkero;

import com.zachwattzkero.kafka.KafkaStreamsManager;
import com.zachwattzkero.socketio.SocketIOBroadcaster;

public class JProgramRunner {
    public static void main( String[] args ) {
        if (args.length >= 0 && args.length < 4) {
            System.out.printf("\nError: Can not start program. Reason: Not enough arguments!");
            System.out.printf("\nCommand form: java ProgramRunner.java <Broker Host> <Broker Port> <SocketIO Host> <SocketIO Port> [enable Debug]");
            System.exit(1);
        }

        var enableDebug = args.length == 4 ? false : true;
        var brokerAddress = args[0] + ":" + args[1];
        var socketIOHost = args[2];
        var socketIOPort = args[3];

        var kafkaStreamsManager = new KafkaStreamsManager(brokerAddress, enableDebug);
        var socketIOBroadcaster = new SocketIOBroadcaster(socketIOHost, socketIOPort, enableDebug);
            kafkaStreamsManager.bindSocketIOServer(socketIOBroadcaster);
            socketIOBroadcaster.bindKafkaStreamsManager(kafkaStreamsManager);

        var shutdownHook = new Thread(new ShutdownHook(kafkaStreamsManager, socketIOBroadcaster));
        Runtime.getRuntime().addShutdownHook(shutdownHook);

        socketIOBroadcaster.startService();
        kafkaStreamsManager.createAndStartTopicStreams();
    }
}
