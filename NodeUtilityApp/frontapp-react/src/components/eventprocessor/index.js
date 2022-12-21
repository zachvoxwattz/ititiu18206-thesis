import { useState, useEffect, useRef } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let currentTopic = appUtils.currentTopic
        let savedDataLog = appUtils.savedDataLog
    
    const [codeValue, setCodeValue] = useState('')
    const [downloadURL, setDownloadURL] = useState(null)
    
    const inputFile = useRef(null)
    const fileDownloader = useRef(null)

    let stringifier = (value) => {
        return JSON.stringify(value, undefined, '\t')
    }

    useEffect(() => {
        if (!currentTopic) {
            setCodeValue("/*\n\t\t\t\t\tThere is no topic selected!\n/*")
            return
        }

        if (savedDataLog.length === 0) {
            setCodeValue("/*\n\t\t\t\t\tUnable to find any saved events!\n/*")
        }
        else {
            setCodeValue(stringifier(savedDataLog))
        }

        if (downloadURL) {
            fileDownloader.current.click()
            URL.revokeObjectURL(downloadURL)
            setDownloadURL(null)
        }

    }, [currentTopic, savedDataLog, setCodeValue, downloadURL])

    const processFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        var importedFile = event.target.files[0]
        fetch(URL.createObjectURL(importedFile))
            .then(res => res.json())
                .then(data => {
                    setCodeValue(stringifier(data))
                })
    }

    const saveEventsToFile = async (event) => {
        event.preventDefault()
        const blobObject = new Blob([savedDataLog], { type: 'application/json' } )
        let fileDownloadURL = URL.createObjectURL(blobObject)
        setDownloadURL(fileDownloadURL)
    }

    return(
        <div id = 'eventProcessor'>
            <input type = 'file' id='file' ref = {inputFile} style={{display: 'none'}} onChange = {(event) => { processFile(event) }} accept = '.json'/>
            <a style = {{display: 'none'}} href = {downloadURL} ref = {fileDownloader} download = {'saved-events.json'}>Download it</a>
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
