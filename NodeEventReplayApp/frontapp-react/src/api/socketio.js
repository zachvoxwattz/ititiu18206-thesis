import { io } from 'socket.io-client'

const localURL = 'http://localhost:3004'
const connectSocketIO = (endpointPath) => {
    if (endpointPath === true) return io(localURL)
    else return io(endpointPath)
}

export { connectSocketIO }