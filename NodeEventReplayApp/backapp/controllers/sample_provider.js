import { v4 as getUUID } from 'uuid'
import valueArray from '../misc/sampleValues.json' assert { type: 'json' }
import topicArray from '../misc/sampleTopics.json'  assert { type: 'json' }

const sampleProvider = async (req, res, next) => {
    let sample = {
        key: getUUID(),
        offset: Math.floor(Math.random() * 1000000),
        partition: Math.floor(Math.random() * 5),
        topic: topicArray[Math.floor(Math.random() * topicArray.length)],
        value: JSON.stringify(valueArray[Math.floor(Math.random() * valueArray.length)])
    }

    res.send(sample)
}

export { sampleProvider }
