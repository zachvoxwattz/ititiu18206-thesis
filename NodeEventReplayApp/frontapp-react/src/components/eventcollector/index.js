import axios from '../../api/axios'
import TopicMenu from './components/topicmenu/index'
import StreamControlPane from './components/streamcontrolpane/index'
import loadingIcon from '../../assets/images/loading.gif'
import { autoScrollDown } from './functions'
import { DataPaneChunk, DataPaneFields, EmptyDataPane } from './components/datapane/index'
import '../../assets/css/eventcollector/streamtable.css'
import '../../assets/css/eventcollector/main.css'

const EventCollector = (props) => {
    
    let contempData = props.appUtils
        let topic = contempData.topic
        let streamStatus = contempData.streamStatus
        let setTopic = contempData.setTopic
        let setStreamStatus = contempData.setStreamStatus
        let eventLog = contempData.eventLog
        let setEventLog = contempData.setEventLog
        let nav = contempData.nav

    const updateLog = (newData) => {
        setEventLog([...eventLog, newData])
    }

    const fetchSampleData = async () => {
        axios.get('/getsampledata')
            .then(res => {
                let appendData = res.data
                updateLog(appendData)
                autoScrollDown()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div id = 'eventCollector'>
            <div id = 'controlPane'>
                <StreamControlPane appUtils = {{topic, setTopic, streamStatus, setStreamStatus, nav}}/>
                <TopicMenu appUtils = {{topic, setTopic, eventLog, setEventLog}}/>
            </div>
            
            <div id = 'streamTable'>
                <DataPaneFields />
                <div id = 'streamLogger'>
                    {
                        eventLog.length !== 0 ?
                            eventLog.map((value, index) => (
                                <DataPaneChunk key = {index} data = {value}/>
                            )) 
                            : 
                            streamStatus.status !== 'active' ? <EmptyDataPane /> : null
                    }
                    {
                        streamStatus.status === 'active' ?
                            <div id = 'loggerPollDiv'>
                                <img className = 'pollingIcon' src = {loadingIcon} alt = 'Loading indicator'/>
                                <h3 id = 'pollingLabel'>Listening for events on selected topic...</h3>
                            </div>
                            : null
                    }
                </div>
            </div>

            <button onClick={() => { fetchSampleData() }}>CLICK TO ADD NEW DATA</button>
        </div>
    )
}

export default EventCollector
