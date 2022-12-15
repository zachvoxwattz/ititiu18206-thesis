import { newSocketIOInstance } from '../../../../api/socketio'
import { useState, useEffect } from 'react'
import { alterButtonsState, autoScrollDown, getSelectedTopic, statusLabelStyles } from './functions'
import '../../../../assets/css/eventcollector/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let contempData = props.appUtils
        let currentTopic = contempData.currentTopic
        let streamStatus = contempData.streamStatus
        let setStreamStatus = contempData.setStreamStatus
        let setEventDataLog = contempData.setEventDataLog
        let socketIOInstance = contempData.socketIOInstance
        let setSocketIOInstance = contempData.setSocketIOInstance
        let broadcastEventName = contempData.broadcastEventName
        let setDisableTopicButtons = contempData.setDisableTopicButtons

    const [btnStatus, setStatus] = useState({ start: false, stop: true })
    const [startBroadcast, setStartBroadcast] = useState(false)

    useEffect(() => {
        if (!startBroadcast && socketIOInstance) {
            socketIOInstance.disconnect()
                socketIOInstance.off('connect')
                socketIOInstance.off('disconnect')
                socketIOInstance.off(broadcastEventName)
            setSocketIOInstance(null)
        }

        const updateLog = (newData) => {
            setEventDataLog(prevData => prevData.concat(newData))
        }

        if (startBroadcast && !socketIOInstance) {
            var socketInstance = newSocketIOInstance(true)
            let startBtn = document.getElementById('streamStartBtn')
            let stopBtn = document.getElementById('streamStopBtn')
            // Definitely gonna disconnect -> commented out 'disconnect' hooks
            // socketInstance.on('disconnect', () => {
            //     // do sth here rather than logging console
            //     console.log("Client disconnected")
            // })
            socketInstance.on('connect', () => {
                // do sth here rather than logging console
                alterButtonsState(startBtn, setStatus)
                setStreamStatus({status: 'active', label: 'Stream is active!'})
                autoScrollDown()
            })

            socketInstance.on('connect_error', () => {
                alterButtonsState(stopBtn, setStatus)
                setStreamStatus({ status: 'error', label: 'Unable to connect to JavaUtilityApp!'})
            })

            socketInstance.on(broadcastEventName, async (newData) => {
                updateLog(newData)
                autoScrollDown()
            })

            setSocketIOInstance(socketInstance)
            alterButtonsState(startBtn, setStatus)
            setStreamStatus({status: 'active', label: 'Stream is active!'})
            autoScrollDown()
        }
    }, [startBroadcast, socketIOInstance, broadcastEventName, setSocketIOInstance, setStreamStatus, setEventDataLog])

    const funcStreamStart = async () => {
        if (currentTopic === false) {
            setStreamStatus({status: 'error', label: 'Can not start a stream without selected topic!'})
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
