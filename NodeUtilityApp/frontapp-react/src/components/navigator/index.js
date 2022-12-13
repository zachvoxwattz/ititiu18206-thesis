import { useState } from 'react'
import { switchView } from './functions'
import axios from '../../api/axios'
import '../../assets/css/navigator/main.css'

const Navigator = (props) => {
    let passedData = props.appUtils
        let nav = passedData.nav
        let setStreamStatus = passedData.setStreamStatus
        let socketIOInstance = passedData.socketIOInstance
        let setSocketIOInstance = passedData.setSocketIOInstance

    const [viewState, setViewState] = useState({collector: true, processor: false})

    const alterViewState = (targetView) => {
        if (targetView === 'collector') {
            setViewState({ collector: true, processor: false})
        }

        else {
            setViewState({ collector: false, processor: true})
        }
    }

    const exitApp = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        socketIOInstance.disconnect()
        setSocketIOInstance(null)
        nav('/connect', {state: {code: 'error', message: 'You have disconnected'}})
    }

    const closeService = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        axios.post('/shutdown', { password: 'goodbye4now' })
                .then(response => {
                    setStreamStatus({status: 'error', label: 'Service shut down'})
                    setTimeout(() => { exitApp() }, 2000)
                })
    }

    return(
        <div id = 'appNavigator'>
            <div id = 'appNavChoices'>
                <div id = 'appNavBtnHolder'>
                    <button disabled = {viewState.collector} className = 'appNavBtn' id = 'appNavCollectorBtn' onClick={() => { switchView('collector'); alterViewState('collector') }}>Collector View</button>
                    <button disabled = {viewState.processor} className = 'appNavBtn' id = 'appNavProcessorBtn' onClick={() => { switchView('processor'); alterViewState('processor') }}>Processor View</button>
                </div>
                
                <div id = 'appExitBtnHolder'>
                    <button className = 'appExitBtn' id = 'appExitOnlyBtn' onClick = {() => { exitApp() }}>Exit</button>
                    <button className = 'appExitBtn' id = 'appExitCloseBtn' onClick={() => { closeService() }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Navigator
