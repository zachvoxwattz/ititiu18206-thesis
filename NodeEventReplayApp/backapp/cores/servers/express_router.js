import express from 'express'
import { topicsProvider } from '../../controllers/topics_provider.js'
import { serviceCheckerProvider } from '../../controllers/service_checker_provider.js'
import { pingHandler } from '../../controllers/ping_handler.js'
import { shutdownHandler } from '../../controllers/shutdown_handler.js'
import { streamHandler } from '../../controllers/stream_handler.js'
import { sampleProvider } from '../../controllers/sample_provider.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/topics', topicsProvider)
router.get('/getsampledata', sampleProvider)
router.post('/isavailable', serviceCheckerProvider)
router.post('/shutdown', shutdownHandler)
router.post('/getstream', streamHandler)

rootRouter.use('/eventreplay', router)
rootRouter.use('/', pingHandler)

export default rootRouter
