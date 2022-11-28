import {Server} from 'socket.io'

var socketIOServer

const prepareSocketIOServer = (server) => {
    socketIOServer = new Server(server, {cors: {origin: true}})
}

const handleSocketIOConnections = () => {
    socketIOServer.on('connection', socket => {
        console.log(`Client at socket ${socket.id} has connected`)
        socket.on('disconnect', () => {
            console.log(`Client at socket ${socket.id} has exited`)
        })
        socket.on('leaveapp', () => {
            socket.disconnect()
        })
    })
}

export { prepareSocketIOServer, handleSocketIOConnections }
