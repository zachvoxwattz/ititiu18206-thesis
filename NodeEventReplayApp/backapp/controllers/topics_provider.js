import { getTopics } from '../cores/kafka_admin_client.js'

const topicsProvider = async (req, res, next) => {
    let recvArr = await getTopics()

    if (recvArr.includes('__consumer_offsets')) {
        let targetIndex = recvArr.indexOf('__consumer_offsets')
        
        if (targetIndex > -1) {
            recvArr.splice(targetIndex, 1)
        }
    }

    res.send(recvArr)
}

export { topicsProvider }
