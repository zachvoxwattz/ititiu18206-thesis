import { useState } from 'react'
import axios from '../../api/axios'
import '../../assets/css/topicmenu.css'

var topicListHideTimer = null
var topicRefreshHideTimer = null

const TopicMenu = (props) => {
    const [ffl, setFFL] = useState(false)
    const [topicData, setTopicData] = useState({code: 'none'})

    const setTopic = (topic) => {
        clearTimeout(topicListHideTimer)

        if (topic === false) {
            props.setTopic(false)
            document.getElementById('topicClearer').style.display = 'none'
            return
        }

        props.setTopic(topic)
        document.getElementById('topicClearer').style.display = 'inline-block'

        topicListHideTimer = setTimeout(() => {
            document.getElementById('topicList').style.display = 'none'
        }, 3000)
    }

    const getTopics = async () => {
        axios.get('/topics')
                .then(response => {
                    let fetchedArr = response.data
                    let returnData

                    if (fetchedArr.size === 0) {
                        returnData = {
                            code: 'error',
                            message: 'No topic available. Create one or some for your cluster!'
                        }
                    }
                    else {
                        returnData = {
                            code: 'success',
                            data: fetchedArr
                        }
                    }

                    setTopicData(returnData)
                })
                .catch((err) => {
                    setTopicData({
                        code: 'error',
                        message: err.response.data.message
                    })
                    clearRefreshTimer()
                })
    }

    const toggleVisibility = () => {
        let comp = document.getElementById('topicList')
        let displayStyle = document.getElementById('topicList').style.display

        if (displayStyle === 'flex') {
            comp.style.display = 'none'
        }

        else if (displayStyle === '' || displayStyle === 'none') {
            comp.style.display = 'flex'
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

    const clearSelection = () => {
        clearTimeout(topicListHideTimer)
        setTopic(false)

        if (topicData?.code === 'error') {
            setTopicData({
                code: 'none'
            })
        }

        revertSelectionsCSS()

        topicListHideTimer = setTimeout(() => {
            document.getElementById('topicList').style.display = 'none'
        }, 3000)
    }

    const displayTopics = () => {
        if (!ffl) {
            getTopics()
        }
        toggleVisibility()
        setFFL(true)
    }

    const clearRefreshTimer = () => {
        clearTimeout(topicRefreshHideTimer)
        document.getElementById('topicRefresher').style.display = 'inline-block'
    }

    const refreshTopics = async () => {
        clearTimeout(topicRefreshHideTimer)
        setTopicData({code: 'none'})
        getTopics()
        document.getElementById('topicRefresher').style.display = 'none'
        
        let selections = document.getElementsByClassName('topicButton')

        for (let i = 0; i < selections; i++) {
            let itor = selections[i]
            itor.classList.remove('topicButtonSelected')
        }

        topicRefreshHideTimer = setTimeout(() => {
            document.getElementById('topicRefresher').style.display = 'inline-block'
        }, 15000)
    }

    return(
        <div id = 'topicMenuSection'>
            <button className = 'topicInteractionButtons' id = 'topicDisplayer' onClick={() => { displayTopics() }}>Display topics</button>
            <button className = 'topicInteractionButtons' id = 'topicRefresher' onClick={() => { revertSelectionsCSS(); refreshTopics() }}>Refresh Topics</button>
            <button className = 'topicInteractionButtons' id = 'topicClearer' onClick={() => { clearSelection() }}>Clear selection</button>
            <div id = 'topicList'>
                {
                    topicData.code === 'none' ? null : null
                }
                {
                    topicData.code === 'success' ?
                        topicData.data.map((item, index) => (
                            <button className = 'topicButton' onClick={(event) => { revertSelectionsCSS(); changeSelectionCSS(event.target); setTopic(item) }} key = {index}>{item}</button>
                        ))
                        : null
                }
                {
                    topicData.code === 'error' ?
                        <button disabled className = 'topicButton' id = 'topicErrorButton'>{topicData.message}</button>
                        : null
                }
            </div>
        </div>
    )
}

export default TopicMenu
