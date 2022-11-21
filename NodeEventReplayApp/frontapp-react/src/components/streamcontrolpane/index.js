//import { useEffect } from 'react'
import '../../assets/css/streamcontrolpane.css'

const StreamControlPane = (props) => {

    let topic = props.topic

    const getSelectedTopic = () => {
        if (topic === '' || topic === false || topic === null) 
            return 'None selected'
        else 
            return topic
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
            </div>
        </div>
    )
}

export default StreamControlPane
