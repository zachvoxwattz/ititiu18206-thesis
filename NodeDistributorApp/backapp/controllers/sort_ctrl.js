import { sendMessage } from '../cores/kafka_client.js'
import { v4 as uuidv4 } from 'uuid'

const sortHandler = async (request, response, next) => {
    let { sampleArray } = request.body

    if (!sampleArray || sampleArray.length == 0) {
        response.status(400).send({message: "There is no input sample array or the input is an empty array!"})
        return
    }

    let eventMessageID = uuidv4()

    let toBeSent = {
        eventMessageID: eventMessageID,
        arrayID: uuidv4(),
        sampleArray: sampleArray,
        startedTime: Date.now()
    }
    await sendMessage(toBeSent, 'tbSorted')
            .catch(err => console.err(err))
                .then(() => console.log(`Message sent successfully, message ID: ${eventMessageID}`))

    response.sendStatus(200)
}

export { sortHandler }