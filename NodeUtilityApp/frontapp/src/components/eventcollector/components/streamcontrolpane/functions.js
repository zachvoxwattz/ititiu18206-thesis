const statusLabelStyles = {
    idle: {
        color: '#89929b'
    },
    active: {
        color: '#a2d2fb'
    },
    suspended: {
        color: '#faa356'
    },
    error: {
        color: '#900d09'
    }
}

const alterButtonsState = (component, updateState) => {
    let btnLabel = component.innerText || component.textContent

    switch (btnLabel) {
        case 'Start':
            updateState({
                start: true,
                stop: false
            })
            break

        case 'Stop':
            updateState({
                start: false, 
                stop: true
            })
            break

        default:
            throw new Error('Invalid action. You are being recorded to the FBI')
    }
}

const currentTopicExpired = (currentTopic, eventDataLog) => {
    let existingTopics = []
    let returnFlag
    eventDataLog.forEach((datagram) => existingTopics.push(datagram.topic))
    
    existingTopics.indexOf(currentTopic) < 0 ? returnFlag = true : returnFlag = false
    return returnFlag
}

const getSelectedTopic = (currentTopic) => {
    if (!currentTopic) return 'None selected'
    else return currentTopic
}

const autoScrollDown = () => {
    setTimeout(() => {
        let streamTable = document.getElementById('streamTable')
        
        streamTable.scrollTo({
            top: streamTable.scrollHeight + streamTable.scrollTop,
            behavior: 'smooth'
        })
    }, 5)
}

export { statusLabelStyles, alterButtonsState, getSelectedTopic, autoScrollDown, currentTopicExpired }
