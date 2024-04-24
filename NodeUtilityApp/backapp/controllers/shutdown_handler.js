import { expressVariable } from "../cores/express/server.js"
import { sendShutdownRequest } from "../cores/socketio/client.js"

const shutdownHandler = async (req, res, next) => {
    let { password } = req.body

    if (!password || password !== 'nuaRequestShutdown') {
        res.status(401).send({
            message: "Incorrect shut down password!"
        })
        return
    }
    if (password === 'nuaRequestShutdown') res.sendStatus(200)

    try { 
        sendShutdownRequest()
        expressVariable.close()
        console.log('Service shut down successfully')
        process.exit(0)
    }
    catch (err) {
        console.log('There was an error trying to shutdown the server')
        process.exit(1)
    }
}

export { shutdownHandler }
