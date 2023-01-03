import valueArray from '../misc/sampleValues.json' assert { type: 'json' }

const sampleProvider = async (req, res, next) => {
    let sample = {
        key: crypto.randomUUID(),
        value: JSON.stringify(valueArray[Math.floor(Math.random() * valueArray.length)])
    }

    res.send(sample)
}

export { sampleProvider }
