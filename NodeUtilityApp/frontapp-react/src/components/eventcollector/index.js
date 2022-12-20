import axios from '../../api/axios'
import TopicMenu from './components/topicmenu/index'
import StreamControlPane from './components/streamcontrolpane/index'
import loadingIcon from '../../assets/images/loading.gif'
import { useState } from 'react'
import { autoScrollDown } from './functions'
import { DataPaneChunk, DataPaneFields, EmptyDataPane, IdleDataPane } from './components/datapane/index'
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
        let savedDataLog = contempData.savedDataLog
        let setSavedDataLog = contempData.setSavedDataLog
        let socketIOInstance = contempData.socketIOInstance
        let setSocketIOInstance = contempData.setSocketIOInstance
        let broadcastEventName = contempData.broadcastEventName
        let setBroadcastEventName = contempData.setBroadcastEventName
        let nav = contempData.nav

    const [disableTopicButtons, setDisableTopicButtons] = useState(false)
    const [currentTopicData, setCurrentTopicData] = useState([])

    const updateLog = (newData) => {
        setCurrentTopicData(prevData => prevData.concat(newData))
    }

    const fetchSampleData = async () => {
        axios.get('/getsampledata')
            .then(res => {
                updateLog(res.data)
                autoScrollDown()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div id = 'eventCollector'>
            {/* TODO: REMOVE Line #49 when done!*/}
            <button id = 'sampleDataBtn' onClick={() => { fetchSampleData() }}>Sample</button>
            <div id = 'controlPane'>
                <StreamControlPane appUtils = {{currentTopic, streamStatus, setStreamStatus, eventDataLog, setEventDataLog, currentTopicData, setCurrentTopicData, socketIOInstance, setSocketIOInstance, broadcastEventName, setDisableTopicButtons, nav}}/>

                <TopicMenu appUtils = {{currentTopic, setCurrentTopic, streamStatus, setStreamStatus, eventDataLog, setEventDataLog, currentTopicData, setCurrentTopicData, socketIOInstance, setSocketIOInstance, setBroadcastEventName, disableTopicButtons, setDisableTopicButtons}}/>
            </div>
            
            <div id = 'streamTable'>
                <DataPaneFields />
                <div id = 'streamLogger'>
                    {
                        currentTopic ?
                            currentTopicData.length !== 0 ?
                                currentTopicData.map((value, index) => (
                                    <DataPaneChunk key = {index} data = {value} appUtils = {{savedDataLog, setSavedDataLog}}/>
                                )) 
                                : 
                                streamStatus.status !== 'active' ? <EmptyDataPane /> : null
                            : <IdleDataPane />
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
            <div id = 'savedEventsSection'>
                <h1 id = 'savedEventsCountLabel'>Number of saved events: {savedDataLog.length}</h1>
                <button id = 'clearSavedEventsBtn'>Clear saved events</button>
            </div>
        </div>
    )
}

export default EventCollector
