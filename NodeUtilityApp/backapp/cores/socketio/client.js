import io from 'socket.io-client'

var socketIOClient
const localURL = 'ws://127.0.0.1:3004'

const initSocketIOClient = (endpointPath) => {
    if (endpointPath === true) socketIOClient = io.connect(localURL, { transports: ['websocket'] })
    else socketIOClient = io.connect(endpointPath, { transports: ['websocket'] })

    socketIOClient.on('connect', () => {
        console.log('[SocketIOClient] Connected to Java Utility App')
    })

    socketIOClient.on('disconnect', () => {
        console.log('[SocketIOClient] Disconnected from Java Utility App')
    })

    socketIOClient.on('connect_error', () => {
        console.log("[SocketIOClient] Trying to connect to Java Utility App...")
    })
}

const shutdownClient = async () => {
    await socketIOClient.emit('nua_request_shutdown', "requestShutdown")
    await socketIOClient.disconnect()
    socketIOClient.off('connect')
    socketIOClient.off('disconnect')
    socketIOClient.off('connect_error')
}

const sendUpdateCommand = (datagram) => {
    socketIOClient.emit('nua_request_update', datagram)
}

export { socketIOClient, initSocketIOClient, sendUpdateCommand, shutdownClient }