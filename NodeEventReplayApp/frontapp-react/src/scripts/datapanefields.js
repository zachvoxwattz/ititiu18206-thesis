import '../css/datapanefields.css'

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

export default DataPaneFields
