import '../../../../assets/css/eventcollector/datapane/chunk.css'
import '../../../../assets/css/eventcollector/datapane/fields.css'
import '../../../../assets/css/eventcollector/datapane/empty.css'

const DataPaneFields = () => {
    return(
        <div id = 'dataPaneFields'>
            <h3 className = 'dataPaneField' id = 'DPselectField'>✅</h3>
            <h3 className = 'dataPaneField' id = 'DPkeyField'>Key</h3>
            <h3 className = 'dataPaneField' id = 'DPoffsetField'>Off.</h3>
            <h3 className = 'dataPaneField' id = 'DPpartitionField'>Part</h3>
            <h3 className = 'dataPaneField' id = 'DPtopicField'>Topic</h3>
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
                <p id = 'dpKeyValue'>{data.key}</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpOffsetDiv'>
                <p id = 'dpOffsetValue'>{data.offset}</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpPartitionDiv'>
                <p id = 'dpPartitionValue'>{data.partition}</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpTopicDiv'>
                <p id = 'dpTopicValue'>{data.topic}</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpMessageDiv'>
                <p id = 'dpMessageValue'>{data.value}</p>
            </div>
	    </div>
    )
}

export { EmptyDataPane, DataPaneChunk, DataPaneFields }
