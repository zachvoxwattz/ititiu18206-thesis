import express from 'express'
import { pingHandler } from '../controllers/ping_ctrl.js'
import { rootRouteCtrl } from '../controllers/root_ctrl.js'
import { registerHandler } from '../controllers/register_ctrl.js'
import { sortHandler } from '../controllers/sort_ctrl.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/pingcheckservice', pingHandler)
router.post('/serviceregistercourse', registerHandler)
router.post('/sorttester', sortHandler)


rootRouter.get('/', rootRouteCtrl)
rootRouter.use('/backapp', router)

export default rootRouter
