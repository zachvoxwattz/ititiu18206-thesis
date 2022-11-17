import '../../assets/css/streamcontrolpane.css'

const StreamControlPane = (props) => {
    return(
        <div id = 'streamControlSection'>
            <button className = 'streamControlButton'>Start</button>
            <button className = 'streamControlButton'>Pause</button>
            <button className = 'streamControlButton'>Stop</button>
        </div>
    )
}

export default StreamControlPane
