import { getTopics } from '../cores/kafka/admin_api.js'

const topicsProvider = async (req, res, next) => {
    let recvData = await getTopics()

    if (recvData?.error) {
        res.status(404).send({message: recvData.message})
        return
    }

    if (recvData.includes('__consumer_offsets')) {
        let targetIndex = recvData.indexOf('__consumer_offsets')
        
        if (targetIndex > -1) {
            recvData.splice(targetIndex, 1)
        }
    }

    res.send(recvData)
}

export { topicsProvider }
