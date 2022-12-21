import { useState, useEffect, useRef } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let currentTopic = appUtils.currentTopic
        let savedDataLog = appUtils.savedDataLog
    
    const [displayText, setDisplayText] = useState('')
    const inputFile = useRef(null)

    useEffect(() => {
        if (!currentTopic) {
            setDisplayText("/*\n\t\t\t\t\tThere is no topic selected!\n/*")
            return
        }

        if (savedDataLog.length === 0) {
            setDisplayText("/*\n\t\t\t\t\tUnable to find any saved events!\n/*")
        }
        else {
            setDisplayText(JSON.stringify(savedDataLog, undefined, "\t"))
        }
    }, [currentTopic, savedDataLog, setDisplayText])

    const processImport = () => {

    }

    return(
        <div id = 'eventProcessor'>
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
                    <CopyBlock text = {displayText} language = {"JSON"} theme = {dracula}/>
                </div>
                <div id = 'eventProcessBtns'>
                    <button className = 'processIOBtn' id = 'processIOImportBtn' onClick={(event) => { processImport() }}>Import</button>
                    <button className = 'processIOBtn' id = 'processIOExportBtn'>Export</button>
                </div>
            </div>
        </div>
    )
}

export default EventProcessor
