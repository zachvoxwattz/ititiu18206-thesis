const toggleTopicListVisibility = () => {
    let topicList = document.getElementById('topicList')
    let topicListDisplayStyle = topicList.style.display
    
    let dispTopicButton = document.getElementById('topicDisplayBtn')

    if (topicListDisplayStyle === 'flex') {
        topicList.style.display = 'none'
        dispTopicButton.innerText = 'Display topics'
        dispTopicButton.textContent = 'Display topics'
        return
    }

    if (topicListDisplayStyle === '' || topicListDisplayStyle === 'none') {
        topicList.style.display = 'flex'
        dispTopicButton.innerText = 'Hide topics'
        dispTopicButton.textContent = 'Hide topics'
        return
    }
}

const handleTopicChanges = (centralDataLog, fetchedArr, setCentralDataLog) => {
    let latterCentralDataLog
    let sortedFetchArray = fetchedArr.sort()
    let removeIndexArray = []

    if (centralDataLog.length < sortedFetchArray.length) {
        let existingTopics = []
        let auxArray = []
        centralDataLog.forEach((datagram) => { existingTopics.push(datagram.topic) })

        sortedFetchArray.forEach((topic) => {
            let foundIndex = existingTopics.indexOf(topic)

            if (foundIndex < 0) {
                let toBeAdded = {
                    topic: topic,
                    topicData: []
                }
                auxArray.push(toBeAdded)
            }
        })
        latterCentralDataLog = centralDataLog.concat(auxArray)
        latterCentralDataLog.forEach((datagram) => {
            let hasObject = sortedFetchArray.indexOf(datagram.topic)

            if (hasObject < 0) {
                removeIndexArray.push(latterCentralDataLog.indexOf(datagram))
            }
        })
        for (let i = removeIndexArray.length - 1; i >= 0; i--) {
            latterCentralDataLog.splice(removeIndexArray[i], 1)
        }
    }
    else if (centralDataLog.length > sortedFetchArray.length) {
        let currentCentralDataLog = [...centralDataLog]
        currentCentralDataLog.forEach((datagram) => {
            let hasObject = sortedFetchArray.indexOf(datagram.topic)

            if (hasObject < 0) {
                removeIndexArray.push(currentCentralDataLog.indexOf(datagram))
            }
        })
        for (let i = removeIndexArray.length - 1; i >= 0; i--) {
            currentCentralDataLog.splice(removeIndexArray[i], 1)
        }
        latterCentralDataLog = currentCentralDataLog

        let existingTopics = []
        let auxArray = []
        latterCentralDataLog.forEach((datagram) => { existingTopics.push(datagram.topic) })

        sortedFetchArray.forEach((topic) => {
            let foundIndex = existingTopics.indexOf(topic)

            if (foundIndex < 0) {
                let toBeAdded = {
                    topic: topic,
                    topicData: []
                }
                auxArray.push(toBeAdded)
            }
        })
        latterCentralDataLog = latterCentralDataLog.concat(auxArray)
    }
    setCentralDataLog(latterCentralDataLog)
}

const revertSelectionsCSS = () => {
    let topicElements = document.getElementsByClassName('topicBtn')
    for (let i = 0; i < topicElements.length; i++) {
        let itor = topicElements[i]
        if (itor.classList.contains('topicBtnSelected')) {
            itor.classList.remove('topicBtnSelected')
        }
    }
}

const changeSelectionCSS = (selectedTopic) => {
    let topicElements = document.getElementsByClassName('topicBtn')
    for (let i = 0; i < topicElements.length; i++) {
        let itor = topicElements[i]
        if (itor === selectedTopic) {
            itor.classList.add('topicBtnSelected')
            break
        }
    }
}

const showTopicClearer = (bool) => {
    bool ? 
        document.getElementById('topicClearBtn').style.display = 'inline-block'
        :
        document.getElementById('topicClearBtn').style.display = 'none'    
}

const forceShowList = () => {
    document.getElementById('topicRefreshBtn').style.display = 'none'
    if (document.getElementById('topicList').style.display === 'none') {
        document.getElementById('topicList').style.display = 'flex'
        document.getElementById('topicDisplayBtn').innerText = 'Hide topics'
        document.getElementById('topicDisplayBtn').textContent = 'Hide topics'
    }
}

const showRefreshButton = () => {
    document.getElementById('topicRefreshBtn').style.display = 'inline-block'
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

export { toggleTopicListVisibility, showRefreshButton, revertSelectionsCSS, changeSelectionCSS, showTopicClearer, forceShowList, autoScrollDown, handleTopicChanges }