import { useState } from 'react'
import { alterButtonsState, getSelectedTopic, statusLabelStyles } from './functions'
import axios from '../../../../api/axios'
import '../../../../assets/css/eventcollector/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let passedData = props.appUtils
        let topic = passedData.topic
        //let setTopic = passedData.setTopic
        let streamStatus = passedData.streamStatus
        let setStreamStatus = passedData.setStreamStatus

    const [btnStatus, setStatus] = useState({ start: false, stop: true })

    const funcStreamStart = (startBtn) => {
        if (topic === false) {
            setStreamStatus({status: 'error', label: 'Can not start a stream without selected topic!'})
            return
        }

        axios.post('/getstream', { streamTopic: topic })
                .then(() => {
                    // Handle here
                    alterButtonsState(startBtn, setStatus)
                    setStreamStatus({status: 'active', label: 'Stream active'})
                })
                .catch(err => {
                    let errStatus = err.response
                    setStreamStatus({status: 'error', label: errStatus.statusText})
                })
    }

    const funcStreamStop = (stopBtn) => {
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
