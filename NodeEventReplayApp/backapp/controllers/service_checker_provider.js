import { checkBrokerExistence } from "../cores/kafka/api.js"

const serviceCheckerProvider = async (req, res, next) => {
    let { brokerDomain, brokerPort } = req.body

    if (!brokerDomain || brokerDomain === '' || !brokerPort || brokerPort === '') {
        res.status(400).send({message: "Bad request!"})
        return
    }

    let targetBroker = [`${brokerDomain}:${brokerPort}`]
    let recvData = await checkBrokerExistence(targetBroker)

    if (recvData?.error) {
        res.status(404).send({message: recvData.message})
        return
    }
    else res.sendStatus(200)
}

export { serviceCheckerProvider }