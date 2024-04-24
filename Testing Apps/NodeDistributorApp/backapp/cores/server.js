import express from 'express'
import cors from 'cors'
import serverRouter from './server_router.js'

const PORT = process.env.APP_PORT || 3000
const server = express()

// Define middlewares that the server would use
server.use(cors())
server.use(express.json({ limit: '50mb'}))
server.use(express.urlencoded({ limit: '50mb', extended: true}))

// Define the Main Router that the server uses
server.use('/', serverRouter)

const startServer = async () => {
    server.listen(PORT, () => console.log(`Server is operational on ${PORT}`))
}

export { startServer, server }
