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

const getSelectedTopic = (currentTopic) => {
    if (!currentTopic) return 'None selected'
    else return currentTopic
}

export { statusLabelStyles, alterButtonsState, getSelectedTopic }
