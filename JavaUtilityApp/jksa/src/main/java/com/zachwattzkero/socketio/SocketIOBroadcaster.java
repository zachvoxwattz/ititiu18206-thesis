package com.zachwattzkero.socketio;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.zachwattzkero.kafka.KafkaStreamsManager;
import com.zachwattzkero.models.MessageDatagram;

public class SocketIOBroadcaster {

    private boolean debugEnabled, portCheckSuccess = false;
    private String hostName, hostPort;

    private Configuration configurations;
    private SocketIOServer serverInstance;
    private KafkaStreamsManager kStreamsManager;
    
    public SocketIOBroadcaster(String host, String port, boolean enableDebug) {
        this.hostName = host;
        this.hostPort = port;
        this.debugEnabled = enableDebug;

        this.configurations = new Configuration();
            configurations.setHostname(this.hostName);
            configurations.setPort(Integer.valueOf(this.hostPort));

        bootUpServer();
        attachCoreHooks();
    }

    public SocketIOBroadcaster(String host, String port) {
        this.hostName = host;
        this.hostPort = port;
        this.debugEnabled = false;

        this.configurations = new Configuration();
            configurations.setHostname(this.hostName);
            configurations.setPort(Integer.valueOf(this.hostPort));

        bootUpServer();
        attachCoreHooks();
    }

    private void bootUpServer() {
        while (!this.portCheckSuccess) {
            this.portCheckSuccess = PortChecker.isAvailable(Integer.parseInt(hostPort), this.debugEnabled);
            
            try { TimeUnit.SECONDS.sleep(1); }
            catch (InterruptedException e) {}
        }
        this.serverInstance = this.portCheckSuccess ? new SocketIOServer(this.configurations) : null;
    }

    private void attachCoreHooks() {
        this.serverInstance.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                var address = client.getRemoteAddress().toString();
                var socketID = client.getSessionId().toString();

                if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Client ID '%s' at '%s' connected!\n", socketID, address);
            }
        });

        this.serverInstance.addDisconnectListener(new DisconnectListener() {
            @Override
            public void onDisconnect(SocketIOClient client) {
                var address = client.getRemoteAddress().toString();
                var socketID = client.getSessionId().toString();
                
                if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Client ID '%s' at '%s' exited!\n", socketID, address);
            }
        });

        this.serverInstance.addEventListener("nua_request_update", String.class, new DataListener<String>() {

            @Override
            public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
                if (data.equals("requestUpdate")) {
                    if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Received topic update request from client %s, informing KafkaStreamsManager to adapt changes...\n", client.getSessionId());
                    kStreamsManager.handleTopicChanges();
                }
            }
        });

        this.serverInstance.addEventListener("nua_request_shutdown", String.class, new DataListener<String>() {

            @Override
            public void onData(SocketIOClient client, String data, AckRequest ackSender) throws Exception {
                if (data.equals("requestShutdown")) {
                    if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Received shutdown request from client %s. Approving...\n", client.getSessionId());
                    System.exit(0);
                }
            }
        });
    }

    public void broadcastEvent(String eventName, String key, String value) {
        this.serverInstance.getBroadcastOperations().sendEvent(eventName, new MessageDatagram(key, value));
        if (this.debugEnabled) System.out.printf("\n\n[SocketIOBroadcaster]\n - Event name: %s\n - Key: %s\n - Value: %s\n", eventName, key, value);
    }

    public void startService() {
        this.serverInstance.start();
        if (this.debugEnabled) System.out.printf("[SocketIOBroadcaster] Service reports. OPERATIONAL @ Port %s\n", this.hostPort);
    }

    public void terminateService() {
        var clients = new ArrayList<>(this.serverInstance.getAllClients());
        if (clients.size() != 0) clients.forEach((client) -> client.disconnect());
        
        this.serverInstance.stop();
        if (this.debugEnabled) System.out.println("[SocketIOBroadcaster] Service reports. TERMINATED");
    }

    public void bindKafkaStreamsManager(KafkaStreamsManager object) { this.kStreamsManager = object; }
    public boolean isDebugEnabled() { return this.debugEnabled; }
}