import { executeRegistry } from '../cores/kafka_client.js'

const registerHandler = async (request, response, next) => {
    let {courseID, courseName} = request.body

    if (!courseID || !courseName) {
        response.sendStatus(400)
        return
    }

    await executeRegistry({courseID, courseName}).then(() => console.log('DONE!')).catch(err => console.error(err))

    response.sendStatus(200)
}

export { registerHandler }
