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

const EmptyDataPane = (props) => {
    return(
        <div id = 'emptyPane'>
            <h1 id = 'emptyPaneLabel'>No record yet! Select a topic and start the stream to begin</h1>
        </div>
    )
}

const DataPaneChunk = (props) => {
    let data = props.data
    return(
        <div className = 'dataPane'>
            <div className = 'dpDisplaySlot' id = 'dpSelectBoxDiv'>
                <input id = 'dpSelectBoxValue' type = 'checkbox'/>
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

export { EmptyDataPane, DataPaneChunk, DataPaneFields }
