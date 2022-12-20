import { useState, useEffect } from 'react'
import { alterButtonsState, autoScrollDown, getSelectedTopic, statusLabelStyles, currentTopicExpired } from './functions'
import '../../../../assets/css/eventcollector/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let contempData = props.appUtils
        let currentTopic = contempData.currentTopic
        let streamStatus = contempData.streamStatus
        let setStreamStatus = contempData.setStreamStatus
        let eventDataLog = contempData.eventDataLog
        let setEventDataLog = contempData.setEventDataLog
        let currentTopicData = contempData.currentTopicData
        let setCurrentTopicData = contempData.setCurrentTopicData
        let socketIOInstance = contempData.socketIOInstance
        let setSocketIOInstance = contempData.setSocketIOInstance
        let broadcastEventName = contempData.broadcastEventName
        let setDisableTopicButtons = contempData.setDisableTopicButtons

    const [btnStatus, setStatus] = useState({ start: false, stop: true })
    const [startBroadcast, setStartBroadcast] = useState(false)

    useEffect(() => {
        if (!startBroadcast && socketIOInstance) {
            let contempInstance = socketIOInstance
                contempInstance.off(broadcastEventName)
                contempInstance.off('connect')
                contempInstance.off('connect_error')
            setSocketIOInstance(contempInstance)
        }

        const updateLog = (newData) => {
            setCurrentTopicData(prevData => prevData.concat(newData))
        }

        if (startBroadcast && socketIOInstance) {
            let startBtn = document.getElementById('streamStartBtn')
            let stopBtn = document.getElementById('streamStopBtn')
            
            socketIOInstance.on('connect', () => {
                // do sth here rather than logging console
                alterButtonsState(startBtn, setStatus)
                setStreamStatus({status: 'active', label: 'Stream is active!'})
                document.getElementById('topicClearBtn').style.display = 'none'
                autoScrollDown()
            })

            socketIOInstance.on('connect_error', () => {
                alterButtonsState(stopBtn, setStatus)
                setStreamStatus({ status: 'error', label: 'Unable to connect to Java Utility App!'})
            })

            socketIOInstance.on(broadcastEventName, async (newData) => {
                updateLog(newData)
                autoScrollDown()
            })

            setSocketIOInstance(socketIOInstance)
            alterButtonsState(startBtn, setStatus)
            setStreamStatus({status: 'active', label: 'Stream is active!'})
            document.getElementById('topicClearBtn').style.display = 'none'
            autoScrollDown()
        }
    }, [startBroadcast, socketIOInstance, broadcastEventName, setSocketIOInstance, setStreamStatus, setCurrentTopicData])

    const funcStreamStart = async () => {
        if (currentTopic === false) {
            setStreamStatus({status: 'error', label: 'Can not start a stream without topic!'})
            return
        }

        if (currentTopicExpired(currentTopic, eventDataLog)) {
            setStreamStatus({status: 'error', label: 'Selected topic does not exist!'})
            return
        }
        
        setDisableTopicButtons(true)
        setStartBroadcast(true)
    }

    const funcStreamStop = (stopBtn) => {
        setStartBroadcast(false)
        alterButtonsState(stopBtn, setStatus)
        setDisableTopicButtons(false)
        setStreamStatus({status: 'suspended', label: 'Stream suspended'})

        let contempDataLog = eventDataLog

        for (let i = 0; i < contempDataLog.length; i++) {
            if (currentTopic === contempDataLog[i].topic) {
                contempDataLog[i].topicData = currentTopicData
                break
            }
        }
        setEventDataLog(contempDataLog)
        document.getElementById('topicClearBtn').style.display = 'inline-block'
    }

    return(
        <div id = 'streamControlSection'>
            <div className = 'streamReportDiv' id = 'streamTopicReport'>
                <h3 className = 'streamReportLabel' id = 'topicCurrentLabel'>Currently selected topic:</h3>
                <h3 className = 'streamReportLabel' id = 'topicCurrentValue'>{ getSelectedTopic(currentTopic) }</h3>
            </div>

            <div className = 'streamReportDiv' id = 'streamStatusReport'>
                <h3 className = 'streamReportLabel' id = 'streamStatusLabel'>Stream Status: </h3>
                {
                    streamStatus.status === 'idle' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.idle} id = 'streamStatusValue'>{streamStatus.label}</h3>
                        : null
                }
                {
                    streamStatus.status === 'active' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.active} id = 'streamStatusValue'>{streamStatus.label}</h3>
                        : null
                }
                {
                    streamStatus.status === 'suspended' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.suspended} id = 'streamStatusValue'>{streamStatus.label}</h3>
                        : null
                }
                {
                    streamStatus.status === 'error' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.error} id = 'streamStatusValue'>{streamStatus.label}</h3>
                        : null
                }
            </div>
            
            <div id = 'streamActionButtons'>
                <button className = 'streamControlBtn' disabled = {btnStatus.start} onClick = {() => { funcStreamStart() }} id = 'streamStartBtn'>Start</button>
                
                <button className = 'streamControlBtn' disabled = {btnStatus.stop} onClick = {(event) => { funcStreamStop(event.target) }} id = 'streamStopBtn'>Stop</button>
            </div>
        </div>
    )
}

export default StreamControlPane
