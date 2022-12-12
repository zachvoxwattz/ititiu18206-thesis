package com.zachwattzkero.socketio;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

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

                if (debugEnabled) System.out.printf("\n[SocketIOBroadcaster] Client ID '%s' at '%s' connected!", socketID, address);
            }
        });

        this.serverInstance.addDisconnectListener(new DisconnectListener() {
            @Override
            public void onDisconnect(SocketIOClient client) {
                String address = client.getRemoteAddress().toString();
                String socketID = client.getSessionId().toString();
                
                if (debugEnabled) System.out.printf("\n[SocketIOBroadcaster] Client ID '%s' at '%s' exited!", socketID, address);
            }
        });
    }

    public void startService() {
        this.serverInstance.start();
        if (this.debugEnabled) System.out.println("[SocketIOBroadcaster] Service reports. OPERATIONAL");
    }

    public void terminateService() {
        if (this.serverInstance.getAllClients().size() != 0) this.serverInstance.getAllClients().forEach((client) -> client.disconnect());
        
        this.serverInstance.stop();
        if (this.debugEnabled) System.out.println("[SocketIOBroadcaster] Service reports. TERMINATED");
    }

    public boolean isDebugEnabled() { return this.debugEnabled; }
}
