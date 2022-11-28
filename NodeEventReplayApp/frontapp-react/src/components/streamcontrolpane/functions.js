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
                pause: false, 
                stop: false
            })
            break

        case 'Pause':
            updateState({
                start: false, 
                pause: true, 
                stop: false
            })
            break

        case 'Stop':
            updateState({
                start: false, 
                pause: true, 
                stop: true
            })
            break

        default:
            throw new Error('Invalid action. You are being recorded to the FBI')
    }
}

const getSelectedTopic = (currentTopic) => {
    if (currentTopic === '' || currentTopic === false || currentTopic === null) 
        return 'None selected'
    else 
        return currentTopic
}

export { statusLabelStyles, alterButtonsState, getSelectedTopic }
