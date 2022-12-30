import io from 'socket.io-client'

var socketIOClient
var pingInterval
const pingDelay = 75 // in seconds!
const localURL = 'ws://127.0.0.1:3004'
const debugEnabled = (process.env.DEBUG_MODE === 'true')

const initSocketIOClient = (endpointPath) => {
    if (endpointPath === true) socketIOClient = io.connect(localURL, { transports: ['websocket'] })
    else socketIOClient = io.connect(endpointPath, { transports: ['websocket'] })

    socketIOClient.on('connect', () => {
        if (debugEnabled) console.log('[SocketIOClient] Connected to Java Utility App')

        pingInterval = setInterval(() => {
            sendPingRequest()
        }, pingDelay * 1000)
    })

    socketIOClient.on('disconnect', () => {
        if (debugEnabled) console.log('[SocketIOClient] Disconnected from Java Utility App')
        socketIOClient.connect()
        clearInterval(pingInterval)
    })

    socketIOClient.on('connect_error', () => {
        if (debugEnabled) console.log("[SocketIOClient] Trying to connect to Java Utility App...")
        clearInterval(pingInterval)
    })
}

const sendShutdownRequest = async () => {
    if (socketIOClient && socketIOClient.connected) 
        await socketIOClient.emit('nua_request_shutdown', "requestShutdown")
    
    await socketIOClient.disconnect()
    socketIOClient.off('connect')
    socketIOClient.off('disconnect')
    socketIOClient.off('connect_error')
}

const sendPingRequest = async () => {
    await socketIOClient.emit('nua_ping', "requestPing")
}

const sendUpdateRequest = async () => {
    await socketIOClient.emit('nua_request_update', "requestUpdate")
}

export { socketIOClient, initSocketIOClient, sendUpdateRequest, sendPingRequest, sendShutdownRequest }