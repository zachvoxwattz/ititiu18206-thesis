const toggleTopicListVisibility = () => {
    let topicList = document.getElementById('topicList')
    let topicListDisplayStyle = topicList.style.display
    
    let dispTopicButton = document.getElementById('topicDisplayer')

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

const revertSelectionsCSS = () => {
    let topicElements = document.getElementsByClassName('topicButton')
    for (let i = 0; i < topicElements.length; i++) {
        let itor = topicElements[i]
        if (itor.classList.contains('topicButtonSelected')) {
            itor.classList.remove('topicButtonSelected')
        }
    }
}

const changeSelectionCSS = (selectedTopic) => {
    let topicElements = document.getElementsByClassName('topicButton')
    for (let i = 0; i < topicElements.length; i++) {
        let itor = topicElements[i]
        if (itor === selectedTopic) {
            itor.classList.add('topicButtonSelected')
            break
        }
    }
}

const showTopicClearer = (bool) => {
    bool ? 
        document.getElementById('topicClearer').style.display = 'inline-block'
        :
        document.getElementById('topicClearer').style.display = 'none'    
}

const forceShowList = () => {
    if (document.getElementById('topicList').style.display === 'none') {
        document.getElementById('topicList').style.display = 'flex'
        document.getElementById('topicDisplayer').innerText = 'Hide topics'
        document.getElementById('topicDisplayer').textContent = 'Hide topics'
    }
}

const clearRefreshTimer = () => {
    document.getElementById('topicRefresher').style.display = 'inline-block'
}

export { toggleTopicListVisibility, clearRefreshTimer, revertSelectionsCSS, changeSelectionCSS, showTopicClearer, forceShowList}