import { getTopics } from '../cores/kafka/admin_api.js'

const topicsProvider = async (req, res, next) => {
    let recvData = await getTopics()

    if (recvData?.error) {
        res.status(404).send({message: recvData.message})
        return
    }
    res.send(recvData)
}

export { topicsProvider }
