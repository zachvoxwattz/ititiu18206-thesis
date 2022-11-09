import express from 'express'
import { topicsProvider } from '../controllers/topics_provider.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/topics', topicsProvider)

rootRouter.use('/eventreplay', router)

export default rootRouter
