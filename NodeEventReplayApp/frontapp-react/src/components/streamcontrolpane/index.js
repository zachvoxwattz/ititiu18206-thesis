import '../../assets/css/streamcontrolpane.css'

const StreamControlPane = (props) => {
    let currentTopic = props.topicUtils.topic
    let nav = props.appNavigation
    
    const exitApp = () => {
        // Handle various stuffs here!
        nav('/connect', {state: {code: 'error', message: 'You have disconnected'}})
    }

    const getSelectedTopic = () => {
        if (currentTopic === '' || currentTopic === false || currentTopic === null) 
            return 'None selected'
        else 
            return currentTopic
    }

    return(
        <div id = 'streamControlSection'>
            <div className = 'streamReportDiv' id = 'streamTopicReport'>
                <h3 className = 'streamReportLabel' id = 'topicCurrentLabel'>Currently selected topic:</h3>
                <h3 className = 'streamReportLabel' id = 'topicCurrentValue'>{ getSelectedTopic() }</h3>
            </div>

            <div className = 'streamReportDiv' id = 'streamStatusReport'>
                <h3 className = 'streamReportLabel' id = 'streamStatusLabel'>Stream Status: </h3>
                <h3 className = 'streamReportLabel' id = 'streamStatusValue'>NOT RUNNING</h3>
            </div>
            
            <div id = 'streamActionButtons'>
                <button className = 'streamControlButton'>Start</button>
                <button className = 'streamControlButton'>Pause</button>
                <button className = 'streamControlButton'>Stop</button>
                <button className = 'streamControlButton' id = 'appExitButton' onClick = {() => { exitApp() }}>Exit</button>
            </div>
        </div>
    )
}

export default StreamControlPane
