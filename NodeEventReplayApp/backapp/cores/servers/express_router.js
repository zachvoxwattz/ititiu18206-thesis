import express from 'express'
import { topicsProvider } from '../../controllers/topics_provider.js'
import { serviceCheckerProvider } from '../../controllers/service_checker_provider.js'
import { pingHandler } from '../../controllers/ping_handler.js'
import { shutdownHandler } from '../../controllers/shutdown_handler.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/topics', topicsProvider)
router.post('/isavailable', serviceCheckerProvider)
router.post('/shutdown', shutdownHandler)

rootRouter.use('/eventreplay', router)
rootRouter.use('/', pingHandler)

export default rootRouter
