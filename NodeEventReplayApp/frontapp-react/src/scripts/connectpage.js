import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/connectpage.css'

const ENDPOINT = 'http://localhost:3005/'
var timeoutVar = null

const ConnectDialog = (props) => {
    const nav = useNavigate()
    const [domain, setDomain] = useState('')
    const [port, setPort] = useState('')
    const [statusData, setStatusData] = useState({code: "none"})
    const [pingEnable, setPingDisabled] = useState(false)
    const [connectEnable, setConnectDisabled] = useState(false)

    const pingServer = async () => {
        clearTimeout(timeoutVar)
        toggleDisableButtons(true)

        setStatusData({
            code: 'progress',
            message: 'Pinging...'
        })

        setTimeout(() => {
            axios.get(ENDPOINT)
                .then(() => {
                    setStatusData({
                        code: 'success',
                        message: "Ping successful!"
                    })
                })
                .catch(err => {
                    setStatusData({
                        code: 'error',
                        message: 'An error occurred while pinging. This is most likely due to the service being offline!'
                    })
                })
                .finally(() => {
                    unshowStatus(2500)
                })
        }, 1250)
    }

    const connectService = async () => {
        clearTimeout(timeoutVar)
        toggleDisableButtons(true)

        setStatusData({
            code: 'progress',
            message: 'Connecting...'
        })

        let datagram = {
            brokerDomain: domain,
            brokerPort: port
        }

        setTimeout(() => {
            axios.post(ENDPOINT + 'eventreplay/isavailable', datagram)
                .then(() => {
                    setStatusData({
                        code: 'success',
                        message: "Connection successful!"
                    })
                    
                    let datagram = {
                        brokerDomain: domain,
                        brokerPort: port
                    }
                    nav('/app', { state: datagram })
                })
                .catch(err => {
                    console.log(err)
                    setStatusData({
                        code: 'error',
                        message: `An error occurred.\nReply from server: ${err.response.data.message}`
                    })
                })
                .finally(() => {
                    unshowStatus(4000)
                })
        }, 1250)
    }

    const unshowStatus = (delay) => {
        timeoutVar = setTimeout(() => {
            setStatusData({
                code: 'none'
            })
            toggleDisableButtons(false)
        }, delay)
    }

    const toggleDisableButtons = (bool) => {
        setPingDisabled(bool)
        setConnectDisabled(bool)
    }

    return(
        <div id = 'connectDialogMain'>
            <div id = 'inputs'>
                <input className = 'inputField' onChange = {event => setDomain(event.target.value)} id = 'brokerDomainField' placeholder = 'Broker Domain'></input>

                <input className = 'inputField' onChange = {event => setPort(event.target.value)} id = 'brokerPortField' placeholder = 'Broker Port'></input>
            </div>

            <div id = 'buttons'>
                <button className = 'connectDialogButtons' onClick={() => pingServer()} id = 'pingButton' disabled = {pingEnable}>Ping</button>
                <button className = 'connectDialogButtons' onClick={() => connectService()} id = 'connectButton' disabled = {connectEnable}>Connect</button>
            </div>

            { statusData.code === 'none' ? null : null}

            { 
                statusData.code === 'error' ? 
                    <StatusMessage statusMessage = {statusData.message} cssStyle = {statusMessageStyle.error} />
                    : null 
            }
            
            { 
                statusData.code === 'success' ? 
                    <StatusMessage statusMessage = {statusData.message} cssStyle = {statusMessageStyle.success}/>
                    : null 
            }
            
            { 
                statusData.code === 'progress' ?
                    <StatusMessage statusMessage = {statusData.message} cssStyle = {statusMessageStyle.progress} />
                    : null 
            }
        </div>
    )
}

const statusMessageStyle = {
    error: {
        backgroundColor: "#792020",
        borderColor: "#DC6060"
    },
    progress: {
        backgroundColor: "#C67E1A",
        borderColor: "#ED9211"
    },
    success: {
        backgroundColor: "#207939",
        borderColor: "#39CF64"
    }
}

const StatusMessage = (props) => {
    let { statusMessage } = props
    let { cssStyle } = props

    return(
        <div className = 'statusMessageSection' style = {cssStyle}>
            <h4 className = 'statusMessageBox'>{statusMessage}</h4>
        </div>
    )
}

export default ConnectDialog
