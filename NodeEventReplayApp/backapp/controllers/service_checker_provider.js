const serviceCheckerProvider = async (req, res, next) => {
    let { brokerDomain, brokerPort } = req.body

    if (!brokerDomain || brokerDomain === '' || !brokerPort || brokerPort === '') {
        res.status(400).send({message: "Bad request!"})
        return
    }
    
    res.sendStatus(200)
}

export { serviceCheckerProvider }