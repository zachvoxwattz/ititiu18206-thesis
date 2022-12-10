const pingHandler = async (request, response, next) => {
    response.sendStatus(200)
}

export { pingHandler }