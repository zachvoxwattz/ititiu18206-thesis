import ControlInterface from "./interface"
import OutputLog from "./outputlog"

const AppBody = (props) => {
    return(
        <div>
            <ControlInterface bodyData={props.appData} updateStatus = {props.updateStatus} updateData={props.updateData}/>
            <OutputLog bodyData={props.appData} bodyStatus = {props.appStatus}/>
        </div>
    )
}

export default AppBody
