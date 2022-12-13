package com.zachwattzkero.socketio;

import java.util.ArrayList;
import java.util.List;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.zachwattzkero.models.MessageDatagram;

public class SocketIOBroadcaster {

    private boolean debugEnabled;
    private String hostName, hostPort;

    private Configuration configurations;
    private SocketIOServer serverInstance;
    
    public SocketIOBroadcaster(String host, String port, boolean enableDebug) {
        this.hostName = host;
        this.hostPort = port;
        this.debugEnabled = enableDebug;

        this.configurations = new Configuration();
            configurations.setHostname(this.hostName);
            configurations.setPort(Integer.valueOf(this.hostPort));

        this.serverInstance = new SocketIOServer(this.configurations);
        attachCoreHooks();
    }

    public SocketIOBroadcaster(String host, String port) {
        this.hostName = host;
        this.hostPort = port;
        this.debugEnabled = false;

        this.configurations = new Configuration();
            configurations.setHostname(this.hostName);
            configurations.setPort(Integer.valueOf(this.hostPort));

        this.serverInstance = new SocketIOServer(this.configurations);
        attachCoreHooks();
    }

    private void attachCoreHooks() {
        this.serverInstance.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                String address = client.getRemoteAddress().toString();
                String socketID = client.getSessionId().toString();

                if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Client ID '%s' at '%s' connected!\n", socketID, address);
            }
        });

        this.serverInstance.addDisconnectListener(new DisconnectListener() {
            @Override
            public void onDisconnect(SocketIOClient client) {
                String address = client.getRemoteAddress().toString();
                String socketID = client.getSessionId().toString();
                
                if (debugEnabled) System.out.printf("[SocketIOBroadcaster] Client ID '%s' at '%s' exited!\n", socketID, address);
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
        List<SocketIOClient> clients = new ArrayList<>(this.serverInstance.getAllClients());
        if (clients.size() != 0) clients.forEach((client) -> client.disconnect());
        
        this.serverInstance.stop();
        if (this.debugEnabled) System.out.println("[SocketIOBroadcaster] Service reports. TERMINATED");
    }

    public boolean isDebugEnabled() { return this.debugEnabled; }
}