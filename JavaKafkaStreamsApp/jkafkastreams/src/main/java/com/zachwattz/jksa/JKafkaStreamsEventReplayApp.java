package com.zachwattz.jksa;

import com.zachwattz.jksa.kafka_streams.KafkaStreamsManagerInstance;
import com.zachwattz.jksa.socketio_server.SocketIOManagerInstance;

public class JKafkaStreamsEventReplayApp
{
    public static void main( String[] args ) {
        if (args.length >= 0 && args.length < 4) {
            System.out.printf("\n[ERROR] Can not start app. Reason: Not enough required arguments!\nCorrect form: java JKafkaStreamsEventReplayApp.java <Host input - String> <Port input - String> [Debug Mode - boolean]");
            System.exit(0);
        }

        boolean debugEnabled;
        KafkaStreamsManagerInstance kafkaStreamManager;
        SocketIOManagerInstance socketIOManager;
        Thread shutdownHook;

        debugEnabled = args.length == 4 ? false : Boolean.parseBoolean(args[4]);
        String kafkaHost = args[0];
        String kafkaPort = args[1];
        String socketIOHost = args[2];
        String socketIOPort = args[3];
        String kafkaHostTarget = kafkaHost + ":" + kafkaPort;

        kafkaStreamManager = new KafkaStreamsManagerInstance(kafkaHostTarget, debugEnabled);
        socketIOManager = new SocketIOManagerInstance(socketIOHost, Integer.parseInt(socketIOPort), kafkaStreamManager, debugEnabled);

        socketIOManager.startService();
        
        // System.out.println("Adding shutdown hook...");
        // shutdownHook = new Thread(() -> {
        //     System.out.printf("\n\n[INFO] Termination command detected. Starting shutdown hook...\n");
        //     kafkaStreamManager.terminateService();
        //     socketIOManager.terminateService();
        //     System.out.printf("\n[INFO] Shutdown hook finished. Exiting JVM.");
        // });
        // System.out.println("Added shutdown hook...");
        // Runtime.getRuntime().addShutdownHook(shutdownHook);

        // socketIOManager.startService();
    }
}
