import { useState } from 'react'
import {toggleTopicListVisibility, revertSelectionsCSS, showTopicClearer, forceShowList, clearRefreshTimer, changeSelectionCSS} from './functions'
import axios from '../../api/axios'
import loadingIcon from '../../assets/images/loading.gif'
import '../../assets/css/topicmenu.css'

const TopicMenu = (props) => {
    let currentTopic = props.topicUtils.topic
    let updateTopic = (topic) => {
            props.topicUtils.setTopic(topic)
    }

    const [ffl, setFFL] = useState(false)
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
                        clearRefreshTimer()
                    }, 1000)
    
                    setTimeout(() => {
                        highlightSelected()
                    }, 1025)
                })
    }

    const highlightSelected = () => {
        if (currentTopic !== '' || currentTopic !== false) {
            let fetchedTopics = document.getElementsByClassName('topicButton')
    
            for (let i = 0; i < fetchedTopics.length; i++) {
                let itor = fetchedTopics[i].innerText || fetchedTopics[i].textContent
                if (itor === currentTopic) {
                    fetchedTopics[i].classList.add('topicButtonSelected')
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
    
    const displayTopics = (ffl) => {
        if (!ffl) {
            setFFL(true)
            getTopics()
        }
        toggleTopicListVisibility()
    }

    return(
        <div id = 'topicMenuSection'>
            <div id = 'topicMenuButtons'>
                <button className = 'topicInteractionButtons' id = 'topicDisplayer' onClick={() => { displayTopics(ffl) }}>Display topics</button>
                <button className = 'topicInteractionButtons' id = 'topicRefresher' onClick={() => { revertSelectionsCSS(); forceShowList(); getTopics() }}>Refresh Topics</button>
                <button className = 'topicInteractionButtons' id = 'topicClearer' onClick={() => { clearSelection(); showTopicClearer(false) }}>Clear selection</button>
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
                            <button className = 'topicButton' onClick={(event) => { revertSelectionsCSS(); changeSelectionCSS(event.target); updateTopic(item); showTopicClearer(true) }} key = {index}>{item}</button>
                        ))
                        : null
                }
                {
                    topicData.code === 'error' ?
                        <button disabled className = 'topicButton' id = 'topicErrorStatus'>{topicData.message}</button>
                        : null
                }
            </div>
        </div>
    )
}

export default TopicMenu
