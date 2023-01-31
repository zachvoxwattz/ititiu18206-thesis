import { useState, useEffect } from 'react'
import '../../../../assets/css/eventcollector/datapane/chunk.css'
import '../../../../assets/css/eventcollector/datapane/fields.css'
import '../../../../assets/css/eventcollector/datapane/empty.css'

const DataPaneFields = (props) => {
    let saveAllEvents = props.appUtils.saveAllEvents

    return(
        <div id = 'dataPaneFields'>
            <button className = 'dataPaneField' id = 'DPselectField' onClick={() => { saveAllEvents() }}>✅</button>
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
    let uniqueID = props.uniqueID
    let appUtils = props.appUtils
        let streamStatus = appUtils.streamStatus
        let uncheckAllBoxes = appUtils.uncheckAllBoxes
        let checkAllBoxes = appUtils.checkAllBoxes
        let saveEvent = appUtils.saveEvent
        let unsaveEvent = appUtils.unsaveEvent
    
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (uncheckAllBoxes) setSelected(false)
        if (checkAllBoxes) setSelected(true)
    }, [uncheckAllBoxes, checkAllBoxes])

    const checkBoxFunction = () => {
        selected ? setSelected(false) : setSelected(true)
    }

    const checkBoxBehavior = () => {
        selected ? unsaveEvent(data) : saveEvent(data)
    }
    
    return(
        <div className = 'dataPane'>
            <div className = 'dpDisplaySlot' id = 'dpSelectBoxDiv'>
                {
                    streamStatus.status !== 'active' ?
                        <input className = 'dpSelectBoxes' id = {`dpSelectBoxValue${uniqueID}`} checked = {!uncheckAllBoxes && selected} type = 'checkbox' onClick = {() => { checkBoxFunction(); }} onChange = {() => { checkBoxBehavior() }}/>
                        : null
                }
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

export { IdleDataPane, EmptyDataPane, DataPaneChunk, DataPaneFields }
