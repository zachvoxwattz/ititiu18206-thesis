import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigator from '../../components/navigator'
import EventCollector from '../../components/eventcollector/index'
import EventProcessor from '../../components/eventprocessor/index'
import '../../assets/css/pages/main.css'

const MainPage = () => {

    const nav = useNavigate()
    var appData = useLocation().state

    useEffect(() => {
        if (!appData?.brokerDomain || !appData?.brokerPort) {
            nav('/connect', { state: {
                code: "error", 
                message: "Connection details are required!"
            }})
        }
        document.getElementById('eventProcessor').style.display = 'none'
    }, [appData?.brokerDomain, appData?.brokerPort, nav])

    const [topic, setTopic] = useState(false)
    const [eventLog, setEventLog] = useState([])
    const [streamStatus, setStreamStatus] = useState({status: 'idle', label: 'Idling'})

    return(
        <div id = 'mainApp'>
            <Navigator appUtils = {{setStreamStatus, nav}}/>
            <EventCollector appUtils = {{topic, setTopic, streamStatus, setStreamStatus, eventLog, setEventLog}}/>
            <EventProcessor />
        </div>
    )
}

export default MainPage
