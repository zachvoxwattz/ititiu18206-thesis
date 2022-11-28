import { useState } from 'react'
import { alterButtonsState, getSelectedTopic, statusLabelStyles } from './functions'
import axios from '../../api/axios'
import '../../assets/css/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let currentTopic = props.topicUtils.topic
    let nav = props.appNavigation
    let streamStatusData = props.streamUtils.streamStatus

    const [btnStatus, setStatus] = useState({ start: false, pause: true, stop: true })

    let updateStreamStatus = (status) => {
        props.streamUtils.setStreamStatus(status)
    }

    const funcStreamStart = (startBtn) => {
        if (currentTopic === false) {
            updateStreamStatus({status: 'error', label: 'Can not start a stream without selected topic!'})
            return
        }

        alterButtonsState(startBtn, setStatus)
        updateStreamStatus({status: 'active', label: 'Stream active'})
    }

    const funcStreamPause = (pauseBtn) => {
        alterButtonsState(pauseBtn, setStatus)
        updateStreamStatus({status: 'suspended', label: 'Stream suspended'})
    }

    const funcStreamStop = (stopBtn) => {
        alterButtonsState(stopBtn, setStatus)
        updateStreamStatus({status: 'idle', label: 'Idling'})
    }

    const exitApp = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        nav('/connect', {state: {code: 'error', message: 'You have disconnected'}})
    }

    const closeService = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        axios.post('/shutdown', { password: 'goodbye4now' })
                .then(response => {
                    updateStreamStatus({status: 'error', label: 'Service shut down'})
                    setTimeout(() => { exitApp() }, 2000)
                })
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
                    streamStatusData.status === 'idle' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.idle} id = 'streamStatusValue'>{streamStatusData.label}</h3>
                        : null
                }
                {
                    streamStatusData.status === 'active' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.active} id = 'streamStatusValue'>{streamStatusData.label}</h3>
                        : null
                }
                {
                    streamStatusData.status === 'suspended' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.suspended} id = 'streamStatusValue'>{streamStatusData.label}</h3>
                        : null
                }
                {
                    streamStatusData.status === 'error' ?
                        <h3 className = 'streamReportLabel' style = {statusLabelStyles.error} id = 'streamStatusValue'>{streamStatusData.label}</h3>
                        : null
                }
            </div>
            
            <div id = 'streamActionButtons'>
                <button disabled = {btnStatus.start} onClick = {(event) => { funcStreamStart(event.target) }} className = 'streamControlBtn' id = 'streamStartBtn'>Start</button>

                <button disabled = {btnStatus.pause} onClick = {(event) => { funcStreamPause(event.target) }} className = 'streamControlBtn' id = 'streamPauseBtn'>Pause</button>
                
                <button disabled = {btnStatus.stop} onClick = {(event) => { funcStreamStop(event.target) }} className = 'streamControlBtn' id = 'streamStopBtn'>Stop</button>
                
                <button className = 'streamControlBtn' id = 'appExitBtn' onClick = {() => { exitApp() }}>Exit</button>
                <button className = 'streamControlBtn' id = 'appCloseBtn' onClick={() => { closeService() }}>Close and Exit</button>
            </div>
        </div>
    )
}

export default StreamControlPane
