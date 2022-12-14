import { useState } from 'react'
import {toggleTopicListVisibility, revertSelectionsCSS, showTopicClearer, forceShowList, showRefreshButton, changeSelectionCSS} from './functions'
import axios from '../../../../api/axios'
import loadingIcon from '../../../../assets/images/loading.gif'
import '../../../../assets/css/eventcollector/topicmenu.css'

const TopicMenu = (props) => {
    let passedData = props.appUtils
        let topic = passedData.topic
        let setTopic = passedData.setTopic
        let eventLog = passedData.eventLog
        let setEventLog = passedData.setEventLog
        let setBroadcastEventName = passedData.setBroadcastEventName

    let updateTopic = (topic) => {
        setTopic(topic)
        setBroadcastEventName('sv_broadcast_' + topic)
    }

    let clearLog = () => {
        setEventLog([])
    }

    const [firstFetch, setFirstFetch] = useState(false)
    const [topicData, setTopicData] = useState({code: 'none'})

    const getTopics = async () => {
        let returnData
        setTopicData({code: "pending"})
    
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
                            data: fetchedArr
                        }
                    }
                })
                .catch((err) => {
                    returnData = {
                        code: 'error',
                        message: err.response.data.message
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setTopicData(returnData)
                        showRefreshButton()
                    }, 1000)
    
                    setTimeout(() => {
                        highlightSelected()
                    }, 1025)
                })
    }

    const highlightSelected = () => {
        if (topic !== '' || topic !== false) {
            let fetchedTopics = document.getElementsByClassName('topicBtn')
    
            for (let i = 0; i < fetchedTopics.length; i++) {
                let itor = fetchedTopics[i].innerText || fetchedTopics[i].textContent
                if (itor === topic) {
                    fetchedTopics[i].classList.add('topicBtnSelected')
                    break;
                }
            }
        }
    }

    const clearSelection = () => {
        updateTopic(false)
        if (topicData?.code === 'error') {
            setTopicData({
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
        toggleTopicListVisibility()
    }

    return(
        <div id = 'topicMenuSection'>
            <div id = 'topicMenuBtns'>
                <button className = 'topicInteractionBtn' id = 'topicDisplayBtn' onClick={() => { displayTopics(firstFetch) }}>Display topics</button>

                <button className = 'topicInteractionBtn' id = 'topicRefreshBtn' onClick={() => { revertSelectionsCSS(); forceShowList(); getTopics() }}>Refresh Topics</button>

                <button className = 'topicInteractionBtn' id = 'topicClearBtn' onClick={() => { clearSelection(); showTopicClearer(false) }}>Clear selection</button>
                
                {
                    eventLog.length !== 0 ?
                        <button className = 'topicInteractionBtn' id = 'clearLogBtn' onClick={() => { clearLog() }}>Clear Event Log</button>
                        : null
                }
                
            </div>
            
            <div id = 'topicList'>
                {
                    topicData.code === 'none' ? null : null
                }

                {
                    topicData.code === 'pending' ? 
                        <img className = 'loadingIcon' src = {loadingIcon} alt = 'Loading indicator'/>
                        : null
                }

                {
                    topicData.code === 'success' ?
                        topicData.data.map((item, index) => (
                            <button className = 'topicBtn' onClick={(event) => { revertSelectionsCSS(); changeSelectionCSS(event.target); updateTopic(item); showTopicClearer(true) }} key = {index}>{item}</button>
                        ))
                        : null
                }
                {
                    topicData.code === 'error' ?
                        <button disabled className = 'topicBtn' id = 'topicErrorStatus'>{topicData.message}</button>
                        : null
                }
            </div>
        </div>
    )
}

export default TopicMenu
