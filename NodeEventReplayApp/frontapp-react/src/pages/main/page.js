import TopicMenu from '../../components/topicmenu/index'
import StreamControlPane from '../../components/streamcontrolpane'
import { DataPaneChunk, DataPaneFields } from '../../components/datapane/index'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../assets/css/mainpage.css'
import '../../assets/css/streamtable.css'

const MainPage = () => {

    const nav = useNavigate()
    var appData = useLocation().state

    useEffect(() => {
        if (!appData?.brokerDomain || !appData?.brokerPort) {
            nav('/connect', { state: {
                code: "error", 
                message: "You need to provide connection details first!"
            }})
        }
    }, [appData?.brokerDomain, appData?.brokerPort, nav])

    const [topic, setTopic] = useState(false)
    const [streamStatus, setStreamStatus] = useState({status: 'idle', label: 'Idling'})

    return(
        <div id = 'mainApp'>
            <div id = 'controlPane'>
                <StreamControlPane topicUtils = {{topic, setTopic}} streamUtils = {{streamStatus, setStreamStatus}} appNavigation = {nav}/>
                <TopicMenu topicUtils = {{topic, setTopic}}/>
            </div>
            
            <div id = 'streamTable'>
                <DataPaneFields />
                <div id = 'streamLogger'>
                    <DataPaneChunk data = {samples[0]}/>
                    <DataPaneChunk data = {samples[1]}/>
                    <DataPaneChunk data = {samples[1]}/>
                    <DataPaneChunk data = {samples[0]}/>
                    <DataPaneChunk data = {samples[1]}/>
                    <DataPaneChunk data = {samples[1]}/>
                </div>
            </div>
        </div>
    )
}

const samples = [
    {
        key: '8d70657c-d40f-43f6-9a54-b75071bf48c4',
        offset: 1765,
        partition: 3,
        topic: 'tbSorted',
        value: '{"eventMessageKey": "key", "topic":"tbSorted"}132894892317894701238704873218974089781320471823748917023479'
    },
    {
        key: '8d70657c-d40f-43f6-9a54-b75071bf48c4',
        offset: 17653984092384,
        partition: 3,
        topic: 'vip-netflix-movie-request-AWOL-2319213@9906011',
        value: '{"eventMessageKey": "key", "topic":"tbSorted"}132894892317894701238704873218974089781320471823748917023479'
    },
]

export default MainPage
