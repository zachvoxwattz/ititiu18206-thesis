import { connectSocketIO } from '../../../../api/socketio'
import { useState, useEffect } from 'react'
import { alterButtonsState, getSelectedTopic, statusLabelStyles } from './functions'
import '../../../../assets/css/eventcollector/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let passedData = props.appUtils
        let topic = passedData.topic
        let streamStatus = passedData.streamStatus
        let setStreamStatus = passedData.setStreamStatus
        let socketIO = passedData.socketIO
        let setSocketIO = passedData.setSocketIO

    const [btnStatus, setStatus] = useState({ start: false, stop: true })

    useEffect(() => {
        if (socketIO) {
            socketIO.on("connect", (response) => {
                console.log('Huh, i connected')
                console.log(response)
                // axios.post('/getstream', { streamTopic: topic, socketID: socketIO.id})
                //     .then(() => {
                //         // Handle various stuffs here
                //         let startBtn = document.getElementById('streamStartBtn')
                //         alterButtonsState(startBtn, setStatus)
                //         setStreamStatus({status: 'active', label: 'Stream active'})
                //     })
                //     .catch(err => {
                //         let errStatus = err.response
                //         setStreamStatus({status: 'error', label: errStatus.statusText})
                //     })
            })

            // socketIO.on(topic, (data) => {
            //     console.log(data)
            // })
        }
    })

    const funcStreamStart = () => {
        if (topic === false) {
            setStreamStatus({status: 'error', label: 'Can not start a stream without selected topic!'})
            return
        }
        
        setSocketIO(connectSocketIO(true))
    }

    const funcStreamStop = (stopBtn) => {
        if (socketIO) {
            console.log(socketIO.id)
            socketIO.disconnect()
            setSocketIO(null)
            alterButtonsState(stopBtn, setStatus)
            setStreamStatus({status: 'suspended', label: 'Stream suspended'})
        }
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
                <button className = 'streamControlBtn' disabled = {btnStatus.start} onClick = {(event) => { funcStreamStart() }} id = 'streamStartBtn'>Start</button>
                
                <button className = 'streamControlBtn' disabled = {btnStatus.stop} onClick = {(event) => { funcStreamStop(event.target) }} id = 'streamStopBtn'>Stop</button>
            </div>
        </div>
    )
}

export default StreamControlPane
