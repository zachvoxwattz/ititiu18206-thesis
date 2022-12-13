package com.zachwattzkero;

import com.zachwattzkero.kafka.KafkaStreamsManager;
import com.zachwattzkero.socketio.SocketIOBroadcaster;

public class JProgramRunner 
{
    public static void main( String[] args ) {
        if (args.length >= 0 && args.length < 4) {
            System.out.printf("\nError: Can not start program. Reason: Not enough arguments!");
            System.out.printf("\nCommand form: java ProgramRunner.java <Broker Host> <Broker Port> <SocketIO Host> <SocketIO Port> [enable Debug]");
            System.exit(1);
        }

        boolean enableDebug = args.length == 4 ? false : true;
        String brokerAddress = args[0] + ":" + args[1];
        String socketIOHost = args[2];
        String socketIOPort = args[3];

        KafkaStreamsManager kafkaStreamsManager = new KafkaStreamsManager(brokerAddress, enableDebug);
        SocketIOBroadcaster sIoBroadcaster = new SocketIOBroadcaster(socketIOHost, socketIOPort, enableDebug);
            kafkaStreamsManager.bindSocketIOServer(sIoBroadcaster);

        Thread shutdownHook = new Thread(new ShutdownHook(kafkaStreamsManager, sIoBroadcaster));
        Runtime.getRuntime().addShutdownHook(shutdownHook);

        sIoBroadcaster.startService();
        kafkaStreamsManager.createAndStartTopicStreams();
    }
}
