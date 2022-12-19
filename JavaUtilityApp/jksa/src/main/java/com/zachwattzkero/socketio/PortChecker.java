package com.zachwattzkero.socketio;

import java.net.ServerSocket;

public class PortChecker {
    public static boolean isAvailable(int port, boolean debugEnabled) {
        try {
            // ServerSocket try to open a LOCAL port
            new ServerSocket(port).close();

            // if success, returns true
            return true;
        } catch(Exception e) {
            // if failed, returns false
            if (debugEnabled) System.out.println("[SocketIOBroadcaster] Service reports. PENDING for available port...");
            return false;
        }
    }
}
