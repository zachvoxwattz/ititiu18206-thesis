// import axios from 'axios'
import TopicMenu from '../../components/topicmenu/index'
import StreamControlPane from '../../components/streamcontrolpane'
import { DataPaneChunk, DataPaneFields } from '../../components/datapane/index'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../assets/css/mainpage.css'

//const ENDPOINT = 'http://localhost:3005/eventreplay/topics'
const MainPage = () => {
    const nav = useNavigate()
    const location = useLocation()
    var appData = location.state

    useEffect(() => {
        if (!appData?.brokerDomain || !appData?.brokerPort) {
            nav('/connect', { state: {
                code: "error", 
                message: "You need to provide connection details first!"
            }})
        }
        // axios.get(ENDPOINT).then(response => { setTopics(response.data) })
    }, [appData?.brokerDomain, appData?.brokerPort, nav])

    const [topic, setTopic] = useState('None')

    return(
        <div id = 'mainApp'>
            <div id = 'controlPane'>
                <TopicMenu topic = {topic} setTopic = {setTopic} />
                <StreamControlPane />
            </div>

            <div id = 'mainAppBody'>
                <DataPaneFields />
                <div id = 'streamLogPane'>
                    <div id = 'streamLog'>
                        <DataPaneChunk />
                        <DataPaneChunk />
                        <DataPaneChunk />
                        <DataPaneChunk />
                        <DataPaneChunk />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
