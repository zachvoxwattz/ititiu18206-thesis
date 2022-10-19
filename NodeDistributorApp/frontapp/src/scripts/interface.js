import { useState } from 'react'
import { propsAreValid, generateArray } from './utils'
import '../css/interface.css'
import '../css/buttons.css'
import axios from 'axios'

const DESTINATION = 'http://localhost:3001/backapp/sorttester'
var refreshTimer = null

const ControlInterface = (props) => {

    let currentData = props.bodyData
    const [size, setSize] = useState('')
    const [startValue, setStartValue] = useState('')
    const [endValue, setEndValue] = useState('')

    const update = data => {
        props.updateData(data)
    }

    const processData = () => {
        let validateResults = propsAreValid(size, startValue, endValue)
        if (validateResults.error) {
            update(validateResults)
            return
        }

        let toBeSent = {
            sampleArray: generateArray(size, startValue, endValue),
            sortAlgo: 'bubble'
        }
        update(toBeSent)
    }

    const sendData = async () => {
        await 
            axios.post(DESTINATION, currentData)
                    .catch(err => console.log(err))
                        .then(res => {
                            update({finished: true})
                            clearInterval(refreshTimer)
                            refreshTimer = setTimeout(() => update(''), 2000)
                        })
    }

    return(
        <div id='appInterface'>

            <div id='valueFields'>
                <input className='valueField' id='outputSizeField' onChange={event => setSize(event.target.value)} placeholder='Output size'></input>
                <input className='valueField' id='startValueField' onChange={event => setStartValue(event.target.value)} placeholder='Start Value'></input>
                <input className='valueField' id='endValueField' onChange={event => setEndValue(event.target.value)} placeholder='End Value'></input>
            </div>

            <div id='actionButtons'>
                <button className='actionButton' onClick={() => processData()} id='generateButton'>Generate</button>
                <button className='actionButton' onClick={() => sendData()} id='sendButton'>Send it</button>
            </div>
        </div>
    )
}

export default ControlInterface
