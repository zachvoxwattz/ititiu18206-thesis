import { sendUpdateCommand } from "../cores/socketio/client.js"

const requestSyncTopic = async (req, res, next) => {
    let { requestUpdateTopics } = req.body

    if (requestUpdateTopics) {
        // let sentDatagram = {
        //     requestUpdateTopics: true
        // }

        sendUpdateCommand("requestUpdate")
        res.sendStatus(200)
    }

    else res.sendStatus(400)
}

export { requestSyncTopic }
