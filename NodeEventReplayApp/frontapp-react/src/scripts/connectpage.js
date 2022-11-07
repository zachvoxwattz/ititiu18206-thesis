import '../css/connectpage.css'

const ConnectDialog = (props) => {
    console.log(props)
    return(
        <div id = 'connectDialogMain'>
            <div id = 'inputs'>
                <input className = 'inputField' id = 'brokerDomainField' placeholder = 'Broker Domain'></input>
                <input className = 'inputField' id = 'brokerPortField' placeholder = 'Broker Port'></input>
            </div>

            <div id = 'buttons'>
                <button className = 'connectActionButton' id = 'pingButton'>Ping</button>
                <button className = 'connectActionButton' id = 'connectButton'>Connect</button>
            </div>
        </div>
    )
}

export default ConnectDialog
