import axios from '../../../../api/axios'
import StatusConsole from '../status_console'
import { useState, useEffect } from 'react'
import '../../../../assets/css/eventprocessor/replayer/replayer.css'

const ReplayerComponent = (props) => {
    let passedData = props.appUtils
        let discreteList = passedData.discreteList
        let processorStatus = passedData.processorStatus
        let setProcessorStatus = passedData.setProcessorStatus

    const [entryTopic, setEntryTopic] = useState('')
    const [exitTopic, setExitTopic] = useState('')

    useEffect(() => {
        JSON.stringify(discreteList).length !== 0 ?
            document.getElementById('eventReplayerCore').style.display = 'flex'
            :
            document.getElementById('eventReplayerCore').style.display = 'none'

        !entryTopic || !exitTopic ?
            document.getElementById('eventReplayerMainBtn').disabled = true
            :
            document.getElementById('eventReplayerMainBtn').disabled = false
    }, [discreteList, entryTopic, exitTopic])

    const startPerfTest = async () => {
        setProcessorStatus({status: 'pending'})
        let toBeSent = {
            entryTopic,
            exitTopic,
            testingDataSet: discreteList
        }
        
        axios.post('/testperformance', toBeSent)
                .then(response => {
                    let returnData = response.data
                    setProcessorStatus({
                        status: 'success_perftest',
                        message: returnData.message
                    })
                })
                .catch(err => {
                    let returnCode = err.response.status
                    let returnData = err.response.data

                    if (returnData?.error) {
                        setProcessorStatus({
                            status: 'error_remote',
                            errorCode: returnCode,
                            message: returnData.message,
                            postMessage: returnData.postMessage
                        })
                    }
                })
    }

    return(
        <div id = 'eventReplayerCore'>
            <div id = 'eventReplayerForm'>
                <h3 className = 'eventReplayFormFieldLabel'>Input Topic</h3>
                <div className = 'eventReplayInputValues'>
                    <input type = 'text' className = 'eventReplayFormFieldInput' onChange = {(event => setEntryTopic(event.target.value))}></input>
                </div>

                <h3 className = 'eventReplayFormFieldLabel'>Output Topic</h3>
                <div className = 'eventReplayInputValues'>
                    <input type = 'text' className = 'eventReplayFormFieldInput' onChange = {(event => setExitTopic(event.target.value))}></input>
                </div>
                <button id = 'eventReplayerMainBtn' onClick = {() => { startPerfTest() }}>Replay Events</button>
            </div>

            <StatusConsole appUtils = {{ processorStatus }}/>
        </div>
    )
}

export default ReplayerComponent
