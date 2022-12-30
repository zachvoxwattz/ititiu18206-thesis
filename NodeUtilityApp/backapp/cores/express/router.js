import express from 'express'
import { topicsProvider } from '../../controllers/topics_provider.js'
import { sampleProvider } from '../../controllers/sample_provider.js'
import { serviceCheckerProvider } from '../../controllers/service_checker_provider.js'
import { pingHandler } from '../../controllers/ping_handler.js'
import { shutdownHandler } from '../../controllers/shutdown_handler.js'
import { requestSyncTopic } from '../../controllers/request_topic_sync.js'
import { testPerformanceHandler } from '../../controllers/test_performance_handler.js'

const rootRouter = express.Router()
const internalRouter = express.Router()

internalRouter.get('/topics', topicsProvider)
internalRouter.get('/getsampledata', sampleProvider)
internalRouter.post('/isavailable', serviceCheckerProvider)
internalRouter.post('/requestsynctopics', requestSyncTopic)
internalRouter.post('/testperformance', testPerformanceHandler)
internalRouter.post('/shutdown', shutdownHandler)

rootRouter.use('/nuabackapp', internalRouter)
rootRouter.use('/', pingHandler)

export default rootRouter
