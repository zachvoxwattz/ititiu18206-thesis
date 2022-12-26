import { useState, useEffect, useRef } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let currentTopic = appUtils.currentTopic
        let savedDataLog = appUtils.savedDataLog
    
    const [codeValue, setCodeValue] = useState('')
    const [emptyCode, setEmptyCode] = useState(false)
    const [discreteList, setDiscreteList] = useState([])
    const inputFile = useRef(null)

    let stringifier = (value) => {
        return JSON.stringify(value, undefined, '\t')
    }

    useEffect(() => {
        if (!currentTopic && savedDataLog.length === 0) {
            setCodeValue("/*\n\t\t\t\t\tThere is no topic selected!\n/*")
            setEmptyCode(true)
            return
        }

        if (currentTopic && savedDataLog.length === 0) {
            setCodeValue("/*\n\t\t\t\t\tUnable to find any saved events!\n/*")
        }
        else if (currentTopic && savedDataLog.length !== 0) {
            setDiscreteList(savedDataLog)
            setCodeValue(stringifier(savedDataLog))
            setEmptyCode(false)
        }

    }, [currentTopic, savedDataLog, setCodeValue])

    const processFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        var importedFile = event.target.files[0]
        fetch(URL.createObjectURL(importedFile))
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setCodeValue(stringifier(data))
                    setDiscreteList(data)
                    setEmptyCode(false)
                }
            })
    }

    const saveEventsToFile = async (event) => {
        event.preventDefault()

        const element = document.createElement('a')
        const blobObject = new Blob([stringifier(discreteList)], { type: 'application/json' } )

        element.href = URL.createObjectURL(blobObject)
        element.download = "saved-events.json"

        document.body.appendChild(element)
        element.click()
    }

    const clearContents = () => {
        setDiscreteList([])
        setEmptyCode(true)

        currentTopic ? 
            setCodeValue("/*\n\t\t\t\t\tUnable to find any saved events!\n/*")
            :
            setCodeValue("/*\n\t\t\t\t\tThere is no topic selected!\n/*")
    }

    const reimportEvents = () => {
        setDiscreteList(savedDataLog)
        setCodeValue(stringifier(savedDataLog))
        setEmptyCode(false)
    }

    return(
        <div id = 'eventProcessor'>
            <input type = 'file' id='file' ref = {inputFile} style={{display: 'none'}} onChange = {(event) => { processFile(event) }} accept = '.json'/>
            <div id = 'ioSection'>
                {
                    currentTopic ? 
                        <div id = 'savedEventsTopicLabels'>
                            <h2 id = 'savedEventsTopicBaseLabel'>Saved events of topic</h2>
                            <h2 id = 'savedEventsTopicValueLabel'>{currentTopic}</h2>
                        </div>
                        :
                        <div id = 'savedEventsTopicLabels'>
                            <h2 id = 'savedEventsTopicBaseLabel'>No topic selected!</h2>
                        </div>
                }

                {
                    savedDataLog.length !== 0 ?
                        <button className = 'reviveclearBtns' onClick={() => { reimportEvents() }}>↩️</button>
                        : null
                }
                
                {
                    !emptyCode ? 
                        <button className = 'reviveclearBtns' onClick={() => { clearContents() }}>❌</button>
                        : null
                }
                <div id = 'eventList'>
                    <CopyBlock text = {codeValue} language = {"JSON"} theme = {dracula}/>
                </div>
                <div id = 'eventProcessBtns'>
                    <button className = 'processIOBtn' id = 'processIOImportBtn' onClick = {() => { inputFile.current.click() }}>Import</button>
                    
                    <button className = 'processIOBtn' id = 'processIOExportBtn' onClick = {(e) => saveEventsToFile(e) }>Export</button>
                </div>
            </div>
        </div>
    )
}

export default EventProcessor
