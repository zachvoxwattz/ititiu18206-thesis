import axios from '../../api/axios'
import TopicMenu from './components/topicmenu/index'
import StreamControlPane from './components/streamcontrolpane/index'
import loadingIcon from '../../assets/images/loading.gif'
import { useState } from 'react'
import { autoScrollDown } from './functions'
import { DataPaneChunk, DataPaneFields, EmptyDataPane } from './components/datapane/index'
import '../../assets/css/eventcollector/streamtable.css'
import '../../assets/css/eventcollector/main.css'

const EventCollector = (props) => {
    
    let contempData = props.appUtils
        let currentTopic = contempData.currentTopic
        let streamStatus = contempData.streamStatus
        let setCurrentTopic = contempData.setCurrentTopic
        let setStreamStatus = contempData.setStreamStatus
        let eventDataLog = contempData.eventDataLog
        let setEventDataLog = contempData.setEventDataLog
        let socketIOInstance = contempData.socketIOInstance
        let setSocketIOInstance = contempData.setSocketIOInstance
        let broadcastEventName = contempData.broadcastEventName
        let setBroadcastEventName = contempData.setBroadcastEventName
        let nav = contempData.nav

    const [disableTopicButtons, setDisableTopicButtons] = useState(false)
    
    const updateLog = (newData) => {
        setEventDataLog([...eventDataLog, newData])
    }

    const fetchSampleData = async () => {
        axios.get('/getsampledata')
            .then(res => {
                let appendData = res.data
                updateLog(appendData)
                autoScrollDown()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div id = 'eventCollector'>
            <button id = 'sampleDataBtn' onClick={() => { fetchSampleData() }}>Sample</button>
            <div id = 'controlPane'>
                <StreamControlPane appUtils = {{currentTopic, streamStatus, setStreamStatus, eventDataLog, setEventDataLog, socketIOInstance, setSocketIOInstance, broadcastEventName, setDisableTopicButtons, nav}}/>

                <TopicMenu appUtils = {{currentTopic, setCurrentTopic, streamStatus, setStreamStatus, eventDataLog, setEventDataLog, setBroadcastEventName, disableTopicButtons, setDisableTopicButtons}}/>
            </div>
            
            <div id = 'streamTable'>
                <DataPaneFields />
                <div id = 'streamLogger'>
                    {
                        eventDataLog.length !== 0 ?
                            eventDataLog.map((value, index) => (
                                <DataPaneChunk key = {index} data = {value}/>
                            )) 
                            : 
                            streamStatus.status !== 'active' ? <EmptyDataPane /> : null
                    }
                    {
                        streamStatus.status === 'active' ?
                            <div id = 'loggerPollDiv'>
                                <img className = 'pollingIcon' src = {loadingIcon} alt = 'Loading indicator'/>
                                <h3 id = 'pollingLabel'>Listening for events on selected topic...</h3>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default EventCollector
