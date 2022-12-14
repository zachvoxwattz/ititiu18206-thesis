import { newSocketIOInstance } from '../../../../api/socketio'
import { useState } from 'react'
import { alterButtonsState, getSelectedTopic, statusLabelStyles } from './functions'
import '../../../../assets/css/eventcollector/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let contempData = props.appUtils
        let topic = contempData.topic
        let streamStatus = contempData.streamStatus
        let setStreamStatus = contempData.setStreamStatus
        // let eventLog = contempData.eventLog
        let updateLog = contempData.updateLog
        let socketIOInstance = contempData.socketIOInstance
        let setSocketIOInstance = contempData.setSocketIOInstance
        let broadcastEventName = contempData.broadcastEventName

    const [btnStatus, setStatus] = useState({ start: false, stop: true })

    // const updateLog = (newData) => {
    //     setEventLog([...eventLog, newData])
    // }

    const funcStreamStart = async (startBtn) => {
        if (topic === false) {
            setStreamStatus({status: 'error', label: 'Can not start a stream without selected topic!'})
            return
        }
        
        var socketInstance = newSocketIOInstance(true)

        socketInstance.on('connect', () => {
            // do sth here rather than logging console
            // console.log("Client connected")
        })

        socketInstance.on(broadcastEventName, (newData) => {
            let processedNewData = {
                key: newData.key,
                value: JSON.stringify(newData.value)
            }
            updateLog(processedNewData)
        })

        socketInstance.on('disconnect', () => {
            // do sth here rather than logging console
            // console.log("Client disconnected")
        })

        setSocketIOInstance(socketInstance)
        alterButtonsState(startBtn, setStatus)
        setStreamStatus({status: 'active', label: 'Stream active'})
    }

    const funcStreamStop = (stopBtn) => {
        socketIOInstance.disconnect()
            socketIOInstance.off('connect')
            socketIOInstance.off('disconnect')
            socketIOInstance.off(broadcastEventName)
        setSocketIOInstance(null)
        alterButtonsState(stopBtn, setStatus)
        setStreamStatus({status: 'suspended', label: 'Stream suspended'})
    }

    return(
        <div id = 'streamControlSection'>
            <div className = 'streamReportDiv' id = 'streamTopicReport'>
                <h3 className = 'streamReportLabel' id = 'topicCurrentLabel'>Currently selected topic:</h3>
                <h3 className = 'streamReportLabel' id = 'topicCurrentValue'>{ getSelectedTopic(topic) }</h3>
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
                <button className = 'streamControlBtn' disabled = {btnStatus.start} onClick = {(event) => { funcStreamStart(event.target) }} id = 'streamStartBtn'>Start</button>
                
                <button className = 'streamControlBtn' disabled = {btnStatus.stop} onClick = {(event) => { funcStreamStop(event.target) }} id = 'streamStopBtn'>Stop</button>
            </div>
        </div>
    )
}

export default StreamControlPane
