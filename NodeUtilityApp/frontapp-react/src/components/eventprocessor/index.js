import { useState, useEffect } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let savedDataLog = appUtils.savedDataLog
    
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
        savedDataLog.length === 0 ?
            setDisplayText('You have not saved any events!')
            :
            setDisplayText(JSON.stringify(savedDataLog, null, "\t"))
    }, [savedDataLog])

    return(
        <div id = 'eventProcessor'>
            <div id = 'ioSection'>
                <div id = 'eventImportExport'>
                    <button>Import</button>
                    <button>Export</button>
                </div>
                <div id = 'eventList'>
                    <CopyBlock text = {displayText} language = {"JSON"} theme = {dracula}/>
                </div>
            </div>
        </div>
    )
}

export default EventProcessor
