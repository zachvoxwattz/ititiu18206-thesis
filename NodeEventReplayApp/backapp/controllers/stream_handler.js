const streamHandler = async (req, res, nxt) => {
    let { streamTopic } = req.body
    
    if (!streamTopic) {
        res.status(400).send({
            status: 'error',
            message: 'Invalid request!'
        })
        return
    }
    
    res.sendStatus(200)
}

export { streamHandler }
