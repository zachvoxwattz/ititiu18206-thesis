import { sendUpdateRequest } from '../cores/socketio/client.js'

const requestSyncTopic = async (req, res, next) => {
    let { requestUpdateTopics } = req.body

    if (requestUpdateTopics) {
        sendUpdateRequest()
        res.sendStatus(200)
    }

    else res.sendStatus(400)
}

export { requestSyncTopic }
