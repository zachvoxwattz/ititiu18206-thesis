import DOTENV from 'dotenv'
import express from 'express'
import { Server } from 'http'
import cors from 'cors'
import rootRouter from './router.js'
import { initSocketIOClient } from '../socketio/client.js'

// Loads ENV
DOTENV.config()
const APP_PORT = process.env.APP_PORT

// Initialize express instance and create it with http
const expressInstance = express()
const expressServer = Server(expressInstance)
var expressVariable

// Assign middlewares
expressInstance.use(express.json())
expressInstance.use(express.urlencoded({ extended: false }))
expressInstance.use(cors())
expressInstance.use('/', rootRouter)

const startService = () => {
    // prepareSocketIOServer(expressServer)
    // handleSocketIOConnections()

    initSocketIOClient(true)
    expressVariable = expressServer.listen(APP_PORT, () => {
        console.log(`Server is operating on port ${APP_PORT}`)
    })
}

export { expressServer, expressVariable, startService }
