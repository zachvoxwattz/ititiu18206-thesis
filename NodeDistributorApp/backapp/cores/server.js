import express from 'express'
import serverRouter from './server_router.js'

const PORT = process.env.APP_PORT || 3000
const server = express()

// Define middlewares that the server would use
server.use(express.json())
server.use(express.urlencoded({extended: false}))

// Define the Main Router that the server uses
server.use('/', serverRouter)

const startServer = async () => {
    server.listen(PORT, () => console.log(`Server is operational on ${PORT}`))
}

export { startServer, server }
