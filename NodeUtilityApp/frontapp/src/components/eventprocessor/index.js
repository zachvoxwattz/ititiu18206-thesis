import { useState, useEffect, useRef } from 'react'
import { CopyBlock, monokaiSublime} from 'react-code-blocks'
import ReplayerComponent from './components/replayer/index'
import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let currentTopic = appUtils.currentTopic
        let savedDataLog = appUtils.savedDataLog
    
    const [showState, setShowState] = useState({show: true, icon: '🟢'})
    const [codeValue, setCodeValue] = useState('')
    const [emptyCode, setEmptyCode] = useState(false)
    const [discreteList, setDiscreteList] = useState([])
    const [processorStatus, setProcessorStatus] = useState({status: 'none'})
    const inputFile = useRef(null)

    let toString = (value) => {
        return JSON.stringify(value, undefined, '\t')
    }

    useEffect(() => {
        if (savedDataLog.length === 0) {
            if (!currentTopic) {
                setCodeValue("/*\n\t\tThere is no topic selected!\n/*")
                setEmptyCode(true)
                setProcessorStatus({status: 'none'})
                setDiscreteList([])
                return
            }

            else {
                setCodeValue("/*\n\t\tUnable to find any saved events!\n/*")
                setProcessorStatus({status: 'none'})
                setDiscreteList([])
            }
        }
        else {
            setDiscreteList(savedDataLog)
            setCodeValue(toString(savedDataLog))
            setEmptyCode(false)

            setProcessorStatus({
                status: 'success_import_collector',
                message: `Loaded ${savedDataLog.length} selected event(s)`
            })
        }
    }, [currentTopic, savedDataLog, setCodeValue])

    const importEventsFromFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        var importedFile = event.target.files[0]
        
        if (importedFile.type !== "application/json") {
            setProcessorStatus({
                status: 'error_local',
                message: `File '${importedFile.name}' is not JSON type!`
            })
            return
        }

        fetch(URL.createObjectURL(importedFile))
            .then(res => res.json() )
            .then(parsedData => { processImportedContents(parsedData, importedFile) })
    }

    const processImportedContents = (parsedData, importedFile) => {
        if (Array.isArray(parsedData)) setDiscreteList(parsedData)
        else {
            setProcessorStatus({
                status: 'error_local',
                message: `File '${importedFile.name}' has invalid format!`
            })
            return
        }

        if (importedFile.size <= 1000000) {
            parsedData.forEach((datagram) => {
                let keyList = Object.keys(datagram)
                keyList.forEach((key) => {
                    if (key === 'value' && typeof datagram[key] === 'object') {
                        let strED = JSON.stringify(datagram[key])
                        datagram[key] = strED
                    }
                })
            })
            setCodeValue(toString(parsedData))
            setProcessorStatus({
                status: 'success_import',
                message: `Loaded ${parsedData.length} event(s) data from '${importedFile.name}'`
            })
        }
        else {
            setCodeValue("/*\n\t\tHidden\n/*")
            setProcessorStatus({
                status: 'success_import',
                message: `Loaded ${parsedData.length} event(s) data from '${importedFile.name}'`,
                postMessage: `Data preview is hidden due to massive file size`
            })
        }
        setEmptyCode(false)
    }

    const saveEventsToFile = async (event) => {
        event.preventDefault()

        const element = document.createElement('a')
        const blobObject = new Blob([toString(discreteList)], { type: 'application/json' } )

        element.href = URL.createObjectURL(blobObject)
        element.download = "saved-events.json"

        document.body.appendChild(element)
        element.click()
    }

    const clearContents = () => {
        setProcessorStatus({})
        setDiscreteList([])
        setEmptyCode(true)

        currentTopic ? 
            setCodeValue("/*\n\t\tUnable to find any saved events!\n/*")
            :
            setCodeValue("/*\n\t\tThere is no topic selected!\n/*")
    }

    const reimportEvents = () => {
        setDiscreteList(savedDataLog)
        setCodeValue(toString(savedDataLog))
        setEmptyCode(false)

        setProcessorStatus({
            status: 'success_import_collector',
            message: `Loaded ${savedDataLog.length} selected event(s) from Collector view.`
        })
    }

    const toggleListVisibility = () => {
        showState.show ? 
            setShowState({ show: false, icon: '⭕' })
            :
            setShowState({ show: true, icon: '🟢' })
    }

    return(
        <div id = 'eventProcessor'>
            <input type = 'file' id='file' ref = {inputFile} style={{display: 'none'}} onChange = {(event) => { importEventsFromFile(event) }} accept = '.json'/>
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

                <div id = 'ioInteractableBtns'>
                    <div id = 'ioLeftBtns'>
                        <button className = 'eventStorageInteractionBtns' onClick={() => { toggleListVisibility() }}>{showState.icon}</button>
                        {
                            savedDataLog.length !== 0 ?
                                <button className = 'eventStorageInteractionBtns' onClick={() => { reimportEvents() }}>↩️</button>
                                : null
                        }
                        
                        {
                            !emptyCode ? 
                                <button className = 'eventStorageInteractionBtns' onClick={() => { clearContents() }}>❌</button>
                                : null
                        }
                    </div>

                    <div id = 'ioRightBtns'>
                        <button className = 'processIOBtn' id = 'processIOImportBtn' onClick = {() => { inputFile.current.click() }}>Import</button>
                        
                        <button className = 'processIOBtn' id = 'processIOExportBtn' onClick = {(e) => saveEventsToFile(e) }>Export</button>
                    </div>
                </div>

                {
                    showState.show ?
                        <div id = 'eventList'>
                            <CopyBlock text = {codeValue} language = {"JSON"} theme = {monokaiSublime}/>
                        </div>
                        : null
                }

                <ReplayerComponent appUtils = {{ discreteList, processorStatus, setProcessorStatus }}/>
            </div>
        </div>
    )
}

export default EventProcessor
