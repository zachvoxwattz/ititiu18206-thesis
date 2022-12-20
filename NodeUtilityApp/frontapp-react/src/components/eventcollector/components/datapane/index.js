import { useState } from 'react'
import '../../../../assets/css/eventcollector/datapane/chunk.css'
import '../../../../assets/css/eventcollector/datapane/fields.css'
import '../../../../assets/css/eventcollector/datapane/empty.css'

const DataPaneFields = () => {
    return(
        <div id = 'dataPaneFields'>
            <h3 className = 'dataPaneField' id = 'DPselectField'>✅</h3>
            <h3 className = 'dataPaneField' id = 'DPkeyField'>Key</h3>
            <h3 className = 'dataPaneField' id = 'DPvalueField'>Value</h3>
        </div>
    )
}

const EmptyDataPane = () => {
    return(
        <div id = 'emptyPane'>
            <h1 id = 'emptyPaneLabel'>No record captured in selected topic!</h1>
        </div>
    )
}

const IdleDataPane = () => {
    return(
        <div id = 'emptyPane'>
            <h1 id = 'emptyPaneLabel'>No topic selected to display records!</h1>
        </div>
    )
}

const DataPaneChunk = (props) => {
    let data = props.data
    let appUtils = props.appUtils
        let savedDataLog = appUtils.savedDataLog
        let setSavedDataLog = appUtils.setSavedDataLog

    const [selected, setSelected] = useState(false)
    const checkBoxFunction = () => {
        if (!selected) {
            updateSavedLog(data)
            setSelected(true)
        }
        else {
            removeFromSaved(data, savedDataLog, setSavedDataLog)
            setSelected(false)
        }
    }

    const updateSavedLog = (newLog) => {
        let testExistIndex = savedDataLog.indexOf(newLog)

        if (testExistIndex > 0) {
            console.log('found datagram in saved list, skipping...')
            return
        }

        let contempLog = savedDataLog
        contempLog.push(newLog)
        setSavedDataLog(contempLog)
    }
    
    return(
        <div className = 'dataPane'>
            <div className = 'dpDisplaySlot' id = 'dpSelectBoxDiv'>
                <input id = 'dpSelectBoxValue' type = 'checkbox' checked = {selected} onChange = {() => { checkBoxFunction(); }}/>
            </div>

            <div className = 'dpDisplaySlot' id = 'dpKeyDiv'>
                <p id = 'dpKeyValue'>{data.key ? data.key : 'N/A'}</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpValueDiv'>
                <p id = 'dpValueValue'>{data.value ? data.value : 'N/A'}</p>
            </div>
	    </div>
    )
}

const removeFromSaved = (toBeRemoved, savedDataLog, setSavedDataLog) => {
    let contempData = savedDataLog
    
    for (let i = 0; i < contempData.length; i++) {
        let targetIndex = contempData.indexOf(toBeRemoved)

        if (targetIndex > 0) {
            contempData.splice(targetIndex, 1)
            break
        }
    }
    setSavedDataLog(contempData)
}

export { IdleDataPane, EmptyDataPane, DataPaneChunk, DataPaneFields }
