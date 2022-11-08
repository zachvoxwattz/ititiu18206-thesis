import '../css/mainpage.css'
import '../css/dropdownmenu.css'
import DataPane from './datapane'
import DataPaneFields from './datapanefields'

const MainApp = () => {
    return(
        <div id = 'mainApp'>
            <div id = 'controlPane'>
                <div id = 'topicSelector'>
                    <button id = 'topicMenuButton'>Select a topic</button>
                    <div id = 'dropdownMenu'>
                        <h4>tbSorted</h4>
                        <h4>tbSortedResults</h4>
                        <h4>__consumer_offsets</h4>
                    </div>
                </div>

                <button>Start Stream</button>
            </div>

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
