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

    const [uncheckAllBoxes, setUncheckAllBoxes] = useState(false)
    const [checkAllBoxes, setCheckAllBoxes] = useState(false)
    const [disableTopicButtons, setDisableTopicButtons] = useState(false)
    const [currentTopicData, setCurrentTopicData] = useState([])

    const updateLog = (newData) => {
        setCurrentTopicData(prevData => prevData.concat(newData))
    }

    const saveEvent = (data) => {
        if (savedDataLog.length === 0) {
            setSavedDataLog(prevData => prevData.concat(data))
            return
        }

        let dataKey = data.key
        let existingKeys = []
        savedDataLog.forEach((saved) => existingKeys.push(saved.key))

        let targetIndex = existingKeys.indexOf(dataKey)
        if (targetIndex > 0) {
            console.log('Datagram already exists. Skipping...')
            return
        }
        else setSavedDataLog(prevData => prevData.concat(data))
    }

    const unsaveEvent = (data) => {
        if (savedDataLog.length === 1) {
            setSavedDataLog([])
            return
        }
        
        let contempSavedDataLog = [...savedDataLog]
        let existingKeys = []
        contempSavedDataLog.forEach(datagram => existingKeys.push(datagram.key))

        let removeIndex = existingKeys.indexOf(data.key)
        if (removeIndex !== -1) contempSavedDataLog.splice(removeIndex, 1)
        else console.log('Cant find designated data')
        setSavedDataLog(contempSavedDataLog)
    }

    const saveAllEvents = () => {
        if (streamStatus.status !== 'active') {
            for (let i = 0; i < eventDataLog.length; i++) {
                if (currentTopic === eventDataLog[i].topic) {
                    setSavedDataLog(eventDataLog[i].topicData)
                    break
                }
            }
            setCheckAllBoxes(true)
            setTimeout(() => { setCheckAllBoxes(false) }, 50)
        }
    }

    const clearSavedEvents = () => {
        setSavedDataLog([])
        setUncheckAllBoxes(true)
        setTimeout(() => { setUncheckAllBoxes(false) }, 50)
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

                <TopicMenu appUtils = {{currentTopic, setCurrentTopic, streamStatus, setStreamStatus, eventDataLog, setEventDataLog, currentTopicData, setCurrentTopicData, socketIOInstance, setSocketIOInstance, setBroadcastEventName, disableTopicButtons, setDisableTopicButtons, clearSavedEvents}}/>
            </div>
            
            <div id = 'savedEventsSection'>
                <h2 id = 'savedEventsCountLabel'>Number of saved events:</h2>
                <h2 id = 'savedEventsCountValue'>{savedDataLog.length}</h2>
                {
                    savedDataLog.length !== 0 ?
                        <button id = 'clearSavedEventsBtn' onClick={() => { clearSavedEvents() }}>❌</button>
                        : null
                }
            </div>

            <div id = 'streamTable'>
                <DataPaneFields appUtils = {{saveAllEvents}}/>
                <div id = 'streamLogger'>
                    {
                        currentTopic ?
                            currentTopicData.length !== 0 ?
                                currentTopicData.map((value, index) => (
                                    <DataPaneChunk key = {index} data = {value} uniqueID = {index} appUtils = {{streamStatus, uncheckAllBoxes, checkAllBoxes, saveEvent, unsaveEvent}}/>
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
        </div>
    )
}

export default EventCollector
