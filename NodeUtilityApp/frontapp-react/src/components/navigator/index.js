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
        let broadcastEventName = passedData.broadcastEventName
        let setBroadcastEventName = passedData.setBroadcastEventName

    const [viewState, setViewState] = useState({collector: true, processor: false})

    const alterViewState = (targetView) => {
        targetView === 'collector' ? 
            setViewState({ collector: true, processor: false}) 
            : 
            setViewState({ collector: false, processor: true})
    }

    const exitApp = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        // UPDATE: 'useEffect' is unreliable. I take the comment above back
        
        if (socketIOInstance && socketIOInstance.connected) {
            socketIOInstance.emit('nua_request_shutdown')
            socketIOInstance.off('connect')
            socketIOInstance.off('connect_error')
            socketIOInstance.off(broadcastEventName)
            socketIOInstance.disconnect()
        }

        setBroadcastEventName(null)
        setSocketIOInstance(null)
        nav('/connect', {state: {code: 'error', message: 'You have disconnected'}})
    }

    const closeService = () => {
        // To handle various stuffs post using app, please use 'useEffect' hook!
        // UPDATE: 'useEffect' is unreliable. I take the comment above back
        axios.post('/shutdown', { password: 'goodbye4now' })
            .then(() => {
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
                    <button className = 'appExitBtn' id = 'appExitCloseBtn' onClick = {() => { closeService() }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Navigator
