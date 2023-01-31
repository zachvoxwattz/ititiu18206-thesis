import io from 'socket.io-client'

const pingDelay = 60 // in seconds!
const localURL = 'ws://127.0.0.1:3004'
const newSocketIOInstance = (endpointPath) => {
    if (endpointPath === true) return io(localURL)
    else return io(endpointPath)
}

export { newSocketIOInstance, pingDelay }