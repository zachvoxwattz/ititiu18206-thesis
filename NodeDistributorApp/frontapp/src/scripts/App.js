import axios from 'axios'
import { useState } from 'react';
import '../css/App.css';

const baseBackend = 'http://localhost:3001/backapp/sorttester'

function App() {

  const [arrSize, setArrSize] = useState(0)
  const [startVal, setStartVal] = useState(0)
  const [endVal, setEndVal] = useState(0)
  const [array, setArray] = useState([])

  const sendIt = async (array) => {
    await axios.post(baseBackend, {
      sampleArray: array
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <div id="appTitle">
        <h1>Integer array generator</h1>
      </div>

      <div id="appInterface">

        <input id='outputSizeField' placeholder='Output size' onChange={event => setArrSize(event.target.value)}></input>
        <input id='startValueField' placeholder='Start Value' onChange={event => setStartVal(event.target.value)}></input>
        <input id='endValueField' placeholder='End Value' onChange={event => setEndVal(event.target.value)}></input>
        <button id='generateButton' onClick={() => setArray(createArray(arrSize, startVal, endVal))}>Generate</button>
        <button id='sendButton' onClick={() => sendIt(array)}>Make REST call</button>
      
      </div>

      <div id='appOutputLog'>
        <p>{array.toString()}</p>
      </div>
    </div>
  );
}

function createArray(a, b, c) {
  let array = []
  let size = parseInt(a)
  let start = parseInt(b)
  let end = parseInt(c)
  let sample

  if (start < end) {
    for (let i = 0; i < size; i++) {
      sample = parseInt(Math.floor(Math.random() * (end - start + 1)) + start) 
      array.push(sample)
    }
  }
  else {
    for (let i = 0; i < size; i++) {
      sample = parseInt(Math.floor(Math.random() * (start - end + 1)) + end) 
      array.push(sample)
    }
  }

  return array
}

export default App;
