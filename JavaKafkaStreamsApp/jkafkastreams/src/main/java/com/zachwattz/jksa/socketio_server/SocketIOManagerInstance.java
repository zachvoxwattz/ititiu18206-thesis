package com.zachwattz.jksa.socketio_server;

//import com.zachwattz.jksa.models.MessageDatagram;

//import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.corundumstudio.socketio.listener.ConnectListener;
//import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.zachwattz.jksa.kafka_streams.KafkaStreamsManagerInstance;
//import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.SocketIOClient;

public class SocketIOManagerInstance {
    
    private String instanceHost;
    private int instancePort;
    private boolean debugEnabled;

    private Configuration configuration;
    private SocketIOServer mainServer;
    private KafkaStreamsManagerInstance kafkaStreamsManagerInstance;

    private List<SocketIOClient> connectedClients;
    
    public SocketIOManagerInstance(String host, int port, KafkaStreamsManagerInstance instance, boolean debugEnabled) {
        this.instanceHost = host;
        this.instancePort = port;
        this.debugEnabled = debugEnabled;
        this.kafkaStreamsManagerInstance = instance;

        initConfigs();
        
        // Core server and elements initialization
        this.mainServer = new SocketIOServer(configuration);
        this.connectedClients = new ArrayList<>();

        attachCoreHooks();
        attachTopicHooks();
    }

    private void initConfigs() {
        this.configuration = new Configuration();
        this.configuration.setHostname(this.instanceHost);
        this.configuration.setPort(this.instancePort);
    }

    private void attachCoreHooks() {
        this.mainServer.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                connectedClients.add(client);
                if (debugEnabled) {
                    System.out.printf("\n[DEBUG] Client UUID: '%s' at address %s connected!", client.getSessionId(), client.getRemoteAddress());
                }
            }
        });

        this.mainServer.addDisconnectListener(new DisconnectListener() {
            @Override
            public void onDisconnect(SocketIOClient client) {
                connectedClients.remove(client);
                if (debugEnabled) {
                    System.out.printf("\n[DEBUG] Client UUID: '%s' at address %s disconnected!", client.getSessionId(), client.getRemoteAddress());
                }
            }
        });
    }

    private void attachTopicHooks() {
        List<String> topics = this.kafkaStreamsManagerInstance.getTopicList();

        System.out.println("------------------------------");
        topics.forEach((item) -> System.out.println(item));
        System.out.println("------------------------------");
    }

    public void terminateService() {
        connectedClients.forEach((client) -> client.disconnect());
        mainServer.stop();
    }

    public void assignTopicListeners() {
        // TODO:
    }

    public void startService() {
        this.mainServer.start();
    }

    public void stopService() {
        System.exit(0);
    }
}
