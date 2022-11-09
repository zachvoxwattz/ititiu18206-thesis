import DOTENV from 'dotenv'
import express from 'express'
import cors from 'cors'
import rootRouter from './express_router.js'

// Loads ENV
DOTENV.config()
const APP_PORT = process.env.APP_PORT

// Initialize express instance
const expressServer = express()

// Assign middlewares
expressServer.use(express.json())
expressServer.use(express.urlencoded({ extended: false }))
expressServer.use(cors())
expressServer.use('/', rootRouter)


const startExpress = () => {
    expressServer.listen(APP_PORT, () => {
        console.log(`Server is operating on port ${APP_PORT}`) 
    })
}

export { expressServer, startExpress }
