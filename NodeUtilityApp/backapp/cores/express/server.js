import cors from 'cors'
import DOTENV from 'dotenv'
import express from 'express'
import rootRouter from './router.js'
import { Server } from 'http'
import { initSocketIOClient } from '../socketio/client.js'

// Loads ENV
DOTENV.config()
const APP_PORT = process.env.APP_PORT

// Initialize express instance and create it with http
const expressInstance = express()
const expressServer = Server(expressInstance)
var expressVariable

// Assign middlewares
expressInstance.use(express.json({ limit: '256mb' }));
expressInstance.use(express.urlencoded({ limit: '256mb', extended: true}));
expressInstance.use(cors())
expressInstance.use('/', rootRouter)

const startService = () => {
    initSocketIOClient(true)
    expressVariable = expressServer.listen(APP_PORT, () => {
        console.log(`Server is operating on port ${APP_PORT}`)
    })
}

const getTimestamp = () => {
    return (performance.timeOrigin + performance.now()) / 1000
}

export { expressVariable, startService, getTimestamp }
