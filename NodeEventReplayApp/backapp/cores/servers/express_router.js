import express from 'express'
import { topicsProvider } from '../../controllers/topics_provider.js'
import { serviceCheckerProvider } from '../../controllers/service_checker_provider.js'
import { pingHandler } from '../../controllers/ping_handler.js'
import { shutdownHandler } from '../../controllers/shutdown_handler.js'
import { sampleProvider } from '../../controllers/sample_provider.js'

const rootRouter = express.Router()
const internalRouter = express.Router()

internalRouter.get('/topics', topicsProvider)
internalRouter.get('/getsampledata', sampleProvider)
internalRouter.post('/isavailable', serviceCheckerProvider)
internalRouter.post('/shutdown', shutdownHandler)

rootRouter.use('/eventreplay', internalRouter)
rootRouter.use('/', pingHandler)

export default rootRouter
