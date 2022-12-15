import { useState } from 'react'
import { toggleTopicListVisibility, revertSelectionsCSS, showTopicClearer, forceShowList, showRefreshButton, changeSelectionCSS, handleTopicChanges } from './functions'
import axios from '../../../../api/axios'
import loadingIcon from '../../../../assets/images/loading.gif'
import '../../../../assets/css/eventcollector/topicmenu.css'
import { autoScrollDown } from './functions'

const TopicMenu = (props) => {
    let passedData = props.appUtils
        let currentTopic = passedData.currentTopic
        let setCurrentTopic = passedData.setCurrentTopic
        let eventDataLog = passedData.eventDataLog
        let setEventDataLog = passedData.setEventDataLog
        let centralDataLog = passedData.centralDataLog
        let setCentralDataLog = passedData.setCentralDataLog
        let setBroadcastEventName = passedData.setBroadcastEventName
        let disableTopicButtons = passedData.disableTopicButtons
        let setDisableTopicButtons = passedData.setDisableTopicButtons

    let updateTopic = (topic) => {
        setCurrentTopic(topic)
        setBroadcastEventName('sv_broadcast_' + topic)
    }

    let clearLog = () => {
        setEventDataLog([])
    }

    const [firstFetch, setFirstFetch] = useState(false)
    const [topicStatus, setTopicStatus] = useState({code: 'none'})

    const getTopics = async () => {
        let returnData
        let constructedData
        setTopicStatus({code: "pending"})
    
        axios.get('/topics')
            .then(response => {
                let fetchedArr = response.data
                if (fetchedArr.size === 0) {
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

                    if (centralDataLog.length === 0) {
                        constructedData = []
                        fetchedArr.forEach((itorTopic) => {
                            constructedData.push({
                                topic: itorTopic,
                                topicData: []
                            })
                        })
                    }
                    else if (centralDataLog.length !== fetchedArr.length) {
                        handleTopicChanges(centralDataLog, fetchedArr, setCentralDataLog)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                returnData = {
                    code: 'error',
                    message: err.response.data.message
                }
            })
            .finally(() => {
                setTimeout(() => {
                    if (constructedData) setCentralDataLog(constructedData)
                    setTopicStatus(returnData)
                    showRefreshButton()
                }, 1000)

                setTimeout(() => {
                    highlightSelected()
                }, 1025)
            })
    }

    const highlightSelected = () => {
        if (currentTopic !== '' || currentTopic !== false) {
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
        revertSelectionsCSS()
    }
    
    const displayTopics = (firstFetch) => {
        if (!firstFetch) {
            setFirstFetch(true)
            getTopics()
        }
        centralDataLog.forEach(databulk => console.log(databulk))
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
                    eventDataLog.length !== 0 ?
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
