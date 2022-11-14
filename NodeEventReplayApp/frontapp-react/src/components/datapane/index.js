import '../../assets/css/datapanechunk.css'
import '../../assets/css/datapanefields.css'

const DataPaneChunk = () => {
    return(
        <div className = 'dataPane'>
            <div className = 'dpDisplaySlot' id = 'dpSelectBoxDiv'>
                <input id = 'dpSelectBoxValue' type = 'checkbox'/>
            </div>

            <div className = 'dpDisplaySlot' id = 'dpKeyDiv'>
                <p id = 'dpKeyValue'>fa10296e-4ad2-4b99-a4f6-a7f0e4b2d930</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpOffsetDiv'>
                <p id = 'dpOffsetValue'>1765</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpPartitionDiv'>
                <p id = 'dpPartitionValue'>0</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpTopicDiv'>
                <p id = 'dpTopicValue'>tbSorted</p>
            </div>
            
            <div className = 'dpDisplaySlot' id = 'dpMessageDiv'>
                <p id = 'dpMessageValue'>Loremipsumdolorsitametahihidochothisissorandomthatidontknowwhetherwhatisrealityhaihashdhasja9euhfiusdhfuilasdfkjshdfjashdkjf</p>
            </div>
	    </div>
    )
}

const DataPaneFields = () => {
    return(
        <div id = 'dataPaneFields'>
            <h3 className = 'dataPaneField' id = 'selectField'>Sel</h3>
            <h3 className = 'dataPaneField' id = 'keyField'>Key</h3>
            <h3 className = 'dataPaneField' id = 'offsetField'>Off.</h3>
            <h3 className = 'dataPaneField' id = 'partitionField'>Part.</h3>
            <h3 className = 'dataPaneField' id = 'topicField'>Topic</h3>
            <h3 className = 'dataPaneField' id = 'valueField'>Value</h3>
        </div>
    )
}
export { DataPaneChunk, DataPaneFields }
