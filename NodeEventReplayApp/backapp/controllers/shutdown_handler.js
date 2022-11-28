import { expressVariable } from "../cores/servers/express_server.js"

const shutdownHandler = async (req, res, next) => {
    let { password } = req.body

    if (!password || password === '' || password !== 'goodbye4now') {
        res.status(401).send({
            message: "Incorrect shut down password!"
        })
        return
    }

    else if (password === 'goodbye4now') res.sendStatus(200)

    try {
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
