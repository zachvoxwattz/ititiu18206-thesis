import { useState } from 'react'
import { toggleTopicListVisibility, revertSelectionsCSS, showTopicClearer, forceShowList, showRefreshButton, changeSelectionCSS, handleTopicChanges, autoScrollDown, requestJavaAppUpdate } from './functions'
import axios from '../../../../api/axios'
import loadingIcon from '../../../../assets/images/loading.gif'
import '../../../../assets/css/eventcollector/topicmenu.css'

const TopicMenu = (props) => {
    let passedData = props.appUtils
        let currentTopic = passedData.currentTopic
        let setCurrentTopic = passedData.setCurrentTopic
        let streamStatus = passedData.streamStatus
        let setStreamStatus = passedData.setStreamStatus
        let currentTopicData = passedData.currentTopicData
        let setCurrentTopicData = passedData.setCurrentTopicData
        let eventDataLog = passedData.eventDataLog
        let setEventDataLog = passedData.setEventDataLog
        let setBroadcastEventName = passedData.setBroadcastEventName
        let disableTopicButtons = passedData.disableTopicButtons
        let setDisableTopicButtons = passedData.setDisableTopicButtons
        let clearSavedEvents = passedData.clearSavedEvents

    const [firstFetch, setFirstFetch] = useState(false)
    const [topicStatus, setTopicStatus] = useState({code: 'none'})

    let updateTopic = (topic) => {
        if (!topic) {
            setCurrentTopic(false)
            setCurrentTopicData([])
            setBroadcastEventName(null)
        }
        else {
            clearSavedEvents()
            setCurrentTopic(topic)
            setBroadcastEventName('sv_broadcast_' + topic)
            setCurrentTopicData([])
            setTimeout(() => {
                for (let i = 0; i < eventDataLog.length; i++) {
                    if (topic === eventDataLog[i].topic) {
                        setCurrentTopicData(eventDataLog[i].topicData)
                        break
                    }
                }
            }, 1)
        }

        if (streamStatus.status === 'error') {
            setStreamStatus({status:'idle', label: 'Idling'})
        }
    }

    let clearLog = () => {
        if (!currentTopic) return
        setCurrentTopicData([])

        let currentDataLog = eventDataLog
        for (let i = 0; i < currentDataLog.length; i++) {
            if (currentDataLog[i].topic === currentTopic) {
                currentDataLog[i].topicData = []
                break
            }
        }
        setEventDataLog(currentDataLog)
    }

    const getTopics = async () => {
        let returnData
        let constructedData

        setTopicStatus({code: "pending"})
    
        axios.get('/topics')
            .then(response => {
                let fetchedArr = response.data
                if (fetchedArr.length === 0) {
                    returnData = {
                        code: 'error',
                        message: 'No topic available. Create one or some for your cluster!'
                    }
                }
                else {
                    returnData = {
                        code: 'success',
                        topicList: fetchedArr
                    }

                    if (eventDataLog.length === 0) {
                        constructedData = []
                        fetchedArr.forEach((itorTopic) => {
                            constructedData.push({
                                topic: itorTopic,
                                topicData: []
                            })
                        })
                    }
                    else if (eventDataLog.length !== fetchedArr.length) {
                        handleTopicChanges(eventDataLog, fetchedArr, setEventDataLog)
                        requestJavaAppUpdate()
                    }
                }
            })
            .catch((err) => {
                if (err?.response?.data?.message) {
                    returnData = {
                        code: 'error',
                        message: err.response.data.message
                    }
                }

                else {
                    returnData = {
                        code: 'error',
                        message: "An error occurred while trying to connect to the back end services. Most likely it is offline!"
                    }
                }
            })
            .finally(() => {
                setTimeout(() => {
                    if (constructedData) setEventDataLog(constructedData)
                    setTopicStatus(returnData)
                    showRefreshButton()
                }, 500)

                setTimeout(() => {
                    highlightSelected()
                }, 505)
            })
    }

    const highlightSelected = () => {
        if (currentTopic) {
            let fetchedTopics = document.getElementsByClassName('topicBtn')
    
            for (let i = 0; i < fetchedTopics.length; i++) {
                let itor = fetchedTopics[i].innerText || fetchedTopics[i].textContent
                if (itor === currentTopic) {
                    fetchedTopics[i].classList.add('topicBtnSelected')
                    break;
                }
            }
        }
    }

    const clearSelection = () => {
        updateTopic(false)
        setDisableTopicButtons(false)
        if (topicStatus?.code === 'error') {
            setTopicStatus({
                code: 'none'
            })
        }
        setStreamStatus({status: 'idle', label: 'Idling'})
        revertSelectionsCSS()
    }
    
    const displayTopics = (firstFetch) => {
        if (!firstFetch) {
            setFirstFetch(true)
            getTopics()
        }

        autoScrollDown()
        toggleTopicListVisibility()
    }

    return(
        <div id = 'topicMenuSection'>
            <div id = 'topicMenuBtns'>
                <button className = 'topicInteractionBtn' id = 'topicDisplayBtn' onClick={() => { displayTopics(firstFetch) }}>Display topics</button>

                <button className = 'topicInteractionBtn' id = 'topicRefreshBtn' onClick={() => { revertSelectionsCSS(); forceShowList(); getTopics() }}>Refresh Topics</button>

                <button className = 'topicInteractionBtn' id = 'topicClearBtn' onClick={() => { clearSelection(); showTopicClearer(false) }}>Clear selection</button>
                
                {
                    currentTopicData.length !== 0 ?
                        <button className = 'topicInteractionBtn' id = 'clearLogBtn' onClick={() => { clearLog() }}>Clear Event Log</button>
                        : null
                }
                
            </div>
            
            <div id = 'topicList'>
                {
                    topicStatus.code === 'none' ? null : null
                }

                {
                    topicStatus.code === 'pending' ? 
                        <img className = 'loadingIcon' src = {loadingIcon} alt = 'Loading indicator'/>
                        : null
                }

                {
                    topicStatus.code === 'success' ?
                        topicStatus.topicList.map((item, index) => (
                            <button disabled = {disableTopicButtons} className = 'topicBtn' onClick={(event) => { revertSelectionsCSS(); changeSelectionCSS(event.target); updateTopic(item); showTopicClearer(true) }} key = {index}>{item}</button>
                        ))
                        : null
                }
                {
                    topicStatus.code === 'error' ?
                        <button disabled className = 'topicBtn' id = 'topicErrorStatus'>{topicStatus.message}</button>
                        : null
                }
            </div>
        </div>
    )
}

export default TopicMenu
