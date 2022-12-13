import io from 'socket.io-client'

const localURL = 'ws://localhost:3004'
const newSocketIOInstance = (endpointPath) => {
    if (endpointPath === true) return io(localURL)
    else return io(endpointPath)
}

export { newSocketIOInstance }