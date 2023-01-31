const rootRouteCtrl = async (request, response, next) => {
    response.send({message: 'I dreamt of becoming a website. Please help me achieve the goal!'})
}

export { rootRouteCtrl }
