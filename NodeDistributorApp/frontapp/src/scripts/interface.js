import { useState } from 'react'
import { propsAreValid, generateArray } from './utils'
import '../css/interface.css'
import '../css/buttons.css'
import axios from 'axios'
import SortAlgorithmToggleButton from './toggle_button'

const DESTINATION = 'http://localhost:3001/backapp/sorttester'
//const DESTINATION = 'https://yourremotehostlink/path/to/service'

const ControlInterface = (props) => {

    let currentData = props.bodyData

    const [size, setSize] = useState('')
    const [startValue, setStartValue] = useState('')
    const [endValue, setEndValue] = useState('')
    const [sorter, setSorter] = useState('bubble')

    const updateCurrentData = data => {
        props.updateData(data)
    }

    const updateCurrentStatus = status => {
        props.updateStatus(status)
    }

    const processData = () => {
        let validateResults = propsAreValid(size, startValue, endValue)
        if (validateResults.error) {
            updateCurrentStatus({
                status: 'error',
                message: validateResults.message
            })
            return
        }

        let toBeSent = {
            sampleArray: generateArray(size, startValue, endValue),
            sortAlgo: sorter
        }
        updateCurrentStatus({status: "completed"})
        updateCurrentData(toBeSent)
    }

    const sendData = async () => {
        if (!currentData.sampleArray) {
            updateCurrentStatus({
                status: 'error',
                message: 'ERROR: Can not send to back end as one or more required fields are invalid!'
            })
            return
        }
        
        document.getElementById('sendButton').disabled = true
        updateCurrentStatus({status: 'pending'})

        await 
            axios.post(DESTINATION, currentData)
                    .then(() => {
                        updateCurrentStatus({status: 'success'})
                    })
                    .catch(() => {
                        updateCurrentStatus({
                            status: 'error',
                            message: "ERROR: Can not make a REST call to back end service. This is most likely due to the back end is offline!"
                        })
                        return
                    })
                    .finally(() => {
                        document.getElementById('sendButton').disabled = false
                    })
    }

    return(
        <div id = 'appInterface'>

            <div id = 'valueFields'>
                <input className = 'valueField' id = 'outputSizeField' onChange={event => setSize(event.target.value)} placeholder = 'Output size'></input>
                <input className = 'valueField' id = 'startValueField' onChange={event => setStartValue(event.target.value)} placeholder = 'Start Value'></input>
                <input className = 'valueField' id = 'endValueField' onChange={event => setEndValue(event.target.value)} placeholder = 'End Value'></input>
            </div>

            <SortAlgorithmToggleButton sorter = {sorter} updateSorter = {setSorter}/>

            <div id = 'actionButtons'>
                <button className = 'actionButton' onClick={() => processData()} id = 'generateButton'>Generate</button>
                <button className = 'actionButton' onClick={() => sendData()} id = 'sendButton'>Send it</button>
            </div>
        </div>
    )
}

export default ControlInterface
