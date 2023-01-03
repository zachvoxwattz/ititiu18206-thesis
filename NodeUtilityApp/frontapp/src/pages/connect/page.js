import axios from '../../api/axios'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../assets/css/pages/connect.css'

var timeoutVar = null

const ConnectPage = () => {
    const nav = useNavigate()
    const location = useLocation()

    const [domain, setDomain] = useState('')
    const [port, setPort] = useState('')
    const [statusData, setStatusData] = useState({code: "none"})
    const [pingEnable, setPingDisabled] = useState(false)
    const [connectEnable, setConnectDisabled] = useState(false)

    const unshowStatus = useCallback((delay) => {
        timeoutVar = setTimeout(() => {
            setStatusData({
                code: 'none'
            })
            toggleDisableButtons(false)
        }, delay)
    }, [])

    const toggleDisableButtons = (bool) => {
        setPingDisabled(bool)
        setConnectDisabled(bool)
    }

    useEffect(() => {
        let contempData = location.state

        if (contempData?.code) {
            if (contempData.code === 'error') {
                clearTimeout(timeoutVar)
                setStatusData({
                    code: 'error',
                    message: contempData.message
                })
                unshowStatus(2500)
            }
        }
    }, [location.state, unshowStatus])

    const pingServer = async () => {
        clearTimeout(timeoutVar)
        toggleDisableButtons(true)

        setStatusData({
            code: 'progress',
            message: 'Pinging...'
        })

        setTimeout(() => {
            axios.get('/isavailable')
                .then(() => {
                    setStatusData({
                        code: 'success',
                        message: "Ping successful!"
                    })
                })
                .catch(() => {
                    setStatusData({
                        code: 'error',
                        message: 'An error occurred while pinging.\nMost likely the service is offline!'
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
            brokerDomain: domain.trim(),
            brokerPort: port.trim()
        }

        setTimeout(() => {
            axios.post('/isavailable', datagram)
                .then(() => {
                    setStatusData({
                        code: 'success',
                        message: "Connection successful!"
                    })
                    
                    setTimeout(() => {
                        let datagram = {
                            brokerDomain: domain,
                            brokerPort: port
                        }
                        nav('/app', { state: datagram })
                    }, 1000)
                })
                .catch(err => {
                    let statData
                    if (err.code === 'ERR_NETWORK') {
                        statData = {
                            code: 'error',
                            message: 'An error occurred while connecting.\nMost likely the service is offline!'
                        }
                    }

                    else {
                        statData = {
                            code: 'error',
                            message: `An error occurred while connecting.\nResponse from server: ${err.response.data.message}`
                        }
                    }
                    setStatusData(statData)
                })
                .finally(() => {
                    unshowStatus(4000)
                })
        }, 1250)
    }

    return(
        <div id = 'connectDialogMain'>
            <div id = 'connectDialogBody'>
                <div id = 'inputs'>
                    <input className = 'inputField' onChange = {event => setDomain(event.target.value)} id = 'brokerDomainField' placeholder = 'Broker Domain'></input>

                    <input className = 'inputField' onChange = {event => setPort(event.target.value)} id = 'brokerPortField' placeholder = 'Broker Port'></input>

                    <p id = 'inputFieldGuide'>TIP: Broker domain does not have to be case-sensitive!</p>
                </div>

                <div id = 'buttons'>
                    <button className = 'connectDialogButtons' onClick={() => pingServer()} id = 'pingButton' disabled = {pingEnable}>Ping</button>
                    <button className = 'connectDialogButtons' onClick={() => connectService()} id = 'connectButton' disabled = {connectEnable}>Connect</button>
                </div>

                { statusData.code === 'none' ? null : null }

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

export default ConnectPage
