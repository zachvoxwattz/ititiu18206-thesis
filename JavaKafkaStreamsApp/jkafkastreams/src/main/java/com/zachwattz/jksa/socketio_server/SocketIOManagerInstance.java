package com.zachwattz.jksa.socketio_server;

import java.util.ArrayList;
import java.util.List;

import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.zachwattz.jksa.kafka_streams.KafkaStreamsManagerInstance;
import com.zachwattz.jksa.kafka_streams.KafkaStreamsObject;

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
    private List<String> eventsList;
    
    public SocketIOManagerInstance(String host, int port, KafkaStreamsManagerInstance instance, boolean debugEnabled) {
        this.instanceHost = host;
        this.instancePort = port;
        this.debugEnabled = debugEnabled;
        this.kafkaStreamsManagerInstance = instance;

        initConfigs();
        
        // Core server and elements initialization
        this.mainServer = new SocketIOServer(configuration);
        this.connectedClients = new ArrayList<>();
        this.eventsList = new ArrayList<>();

        attachCoreHooks();
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

    private void attachTopicHookToServer(String eventName, String assignedTopic) {
        KafkaStreamsObject kSObj = this.kafkaStreamsManagerInstance.createNewKafkaStreamInstance(assignedTopic);

        kSObj.bindSocketIO(mainServer, eventName);
        kSObj.initializeStream();
        kSObj.startStream();

        System.out.printf("\n[WOO HOO] Stream topic '%s' binded with Socket.IO event '%s' started!\n", assignedTopic, eventName);
    }

    private void attachTopicHooks() {
        List<String> topics = this.kafkaStreamsManagerInstance.getTopicList();

        topics.forEach((itor) -> {
            String interactTopicEvent = "recv_" + itor;
            this.eventsList.add(interactTopicEvent);
            attachTopicHookToServer(interactTopicEvent, itor);
        });
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
        attachTopicHooks();
        System.out.println("[FINISHED] Done initializing SocketIO Server");
    }
}
