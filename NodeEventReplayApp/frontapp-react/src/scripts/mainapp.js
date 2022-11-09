import DataPane from './datapane'
import DataPaneFields from './datapanefields'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../css/mainpage.css'
import '../css/dropdownmenu.css'

const ENDPOINT = 'http://localhost:3005/eventreplay/topics'
const MainApp = () => {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        axios.get(ENDPOINT).then(response => { setTopics(response.data) })
    }, [])

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
                    <DataPane />
                    <DataPane />
                    <DataPane />
                    <DataPane />
                    <DataPane />
                </div>
		    </div>
        </div>
    )
}

export default MainApp
