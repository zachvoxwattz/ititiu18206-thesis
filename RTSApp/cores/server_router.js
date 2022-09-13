import express from 'express'
import { pingHandler } from '../controllers/ping_ctrl.js'
import { rootRouteCtrl } from '../controllers/root_ctrl.js'
import { registerHandler } from '../controllers/register_ctrl.js'

const rootRouter = express.Router()
const router = express.Router()

router.get('/pingcheckservice', pingHandler)
router.post('/serviceregistercourse', registerHandler)


rootRouter.get('/', rootRouteCtrl)
rootRouter.use('/backapp', router)

export default rootRouter
