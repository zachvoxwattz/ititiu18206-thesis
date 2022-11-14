// import axios from 'axios'
import { DataPaneChunk, DataPaneFields } from '../../components/datapane'
import { /*useState,*/ useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../assets/css/mainpage.css'
import '../../assets/css/dropdownmenu.css'

//const ENDPOINT = 'http://localhost:3005/eventreplay/topics'
const MainPage = () => {
    const nav = useNavigate()
    const location = useLocation()
    var appData = location.state

    // const [topics, setTopics] = useState([])

    useEffect(() => {
        if (!appData?.brokerDomain || !appData?.brokerPort) {
            nav('/connect', { state: {
                code: "error", 
                message: "You need to provide connection details first!"
            }})
        }
        // axios.get(ENDPOINT).then(response => { setTopics(response.data) })
    }, [appData?.brokerDomain, appData?.brokerPort, nav])

    return(
        <div id = 'mainApp'>
            {/* <div id = 'controlPane'>
                <div id = 'topicSelector'>
                    <button id = 'topicMenuButton'>Select a topic</button>
                    <div id = 'dropdownMenu'>
                        {
                            topics.map((itor, index) => (<h4 key = {index}>{itor}</h4>))
                        }
                    </div>
                </div>

                <button>Start Stream</button>
            </div> */}

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
    )
}

export default MainPage
