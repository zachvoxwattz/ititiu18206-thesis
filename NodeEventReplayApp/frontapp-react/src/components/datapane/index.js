import '../../assets/css/datapanechunk.css'
import '../../assets/css/datapanefields.css'

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
export { DataPaneChunk, DataPaneFields }
