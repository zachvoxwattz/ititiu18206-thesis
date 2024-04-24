package com.zachwattzkero;

import com.zachwattzkero.kafka.KafkaStreamsManager;
import com.zachwattzkero.socketio.SocketIOBroadcaster;

public class ShutdownHook implements Runnable {

    private KafkaStreamsManager kManager;
    private SocketIOBroadcaster sIOBroadcaster;

    public ShutdownHook(KafkaStreamsManager kManager, SocketIOBroadcaster sIOBroadcaster) {
        this.kManager = kManager;
        this.sIOBroadcaster = sIOBroadcaster;
    }

    @Override
    public void run() {
        System.out.printf("\n\n-----EXECUTING SHUTDOWN HOOK-----\n\n");

        // Handle service termination here
        this.sIOBroadcaster.terminateService();
        this.kManager.terminateService();
        
        System.out.printf("\n-----SHUTDOWN HOOK EXECUTED!-----\n");
    }
    
}
