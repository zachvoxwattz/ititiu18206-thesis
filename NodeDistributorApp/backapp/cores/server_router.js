import express from 'express'
import { pingHandler } from '../controllers/ping_controller.js'
import { rootRouteCtrl } from '../controllers/root_controller.js'
import { sortHandler } from '../controllers/sort_controller.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/pingcheckservice', pingHandler)
router.post('/sorttester', sortHandler)


rootRouter.get('/', rootRouteCtrl)
rootRouter.use('/backapp', router)

export default rootRouter
