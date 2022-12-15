import { v4 as getUUID } from 'uuid'
import valueArray from '../misc/sampleValues.json' assert { type: 'json' }

const sampleProvider = async (req, res, next) => {
    let sample = {
        key: getUUID(),
        value: JSON.stringify(valueArray[Math.floor(Math.random() * valueArray.length)])
    }

    res.send(sample)
}

export { sampleProvider }
