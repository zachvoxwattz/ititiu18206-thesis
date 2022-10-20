import { sendMessage } from '../cores/kafka_client.js'
import { v4 as uuidv4 } from 'uuid'

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

    let eventMessageID = uuidv4()

    let toBeSent = {
        eventMessageID: eventMessageID,
        arrayID: uuidv4(),
        sampleArray: sampleArray,
        sortAlgo: sortAlgo,
        startedTime: getTimestamp()
    }
 
    await sendMessage(toBeSent, subbedTopic)
            .then(() => console.log(`Message sent successfully, message ID: ${eventMessageID}`))
                .catch(err => console.err(err))

	response.sendStatus(200)
}

const getTimestamp = () => {
    return (performance.timeOrigin + performance.now()) / 1000
}

export { sortHandler }