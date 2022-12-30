import { sendMessage } from '../cores/kafka_client.js'

const subbedTopic = process.env.SUBBED_TOPIC

const sortHandler = async (request, response, next) => {
    let { sampleArray, sortAlgo } = request.body

    if (!sampleArray || sampleArray.length == 0) {
        response.status(400).send({message: "There is no input sample array or the input is an empty array!"})
        return
    }

    if (!sortAlgo || sortAlgo == '') {
        response.status(400).send({message: "There is no information about the Sorting algorithm as it is much needed!"})
        return
    }

    let toBeSent = { sampleArray, sortAlgo }
    await sendMessage(toBeSent, subbedTopic).catch(err => console.log(err))

	response.sendStatus(200)
}

// Quite useful function, remember this!
const getTimestamp = () => {
    return (performance.timeOrigin + performance.now()) / 1000
}

export { sortHandler }