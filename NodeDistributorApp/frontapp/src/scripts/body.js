import ControlInterface from "./interface"
import OutputLog from "./outputlog"

const AppBody = (props) => {
    
    return(
        <div>
            <ControlInterface bodyData={props.appData} updateData={props.updateData}/>
            <OutputLog bodyData={props.appData}/>
        </div>
    )
}

export default AppBody
