import { io } from 'socket.io-client'

const localURL = 'http://localhost:3005'
const connectSocketIO = (path) => {
    if (path === true) return io(localURL)
    else return io(path)
}

export { connectSocketIO }