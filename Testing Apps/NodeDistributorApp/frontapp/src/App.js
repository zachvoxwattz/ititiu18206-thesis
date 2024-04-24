import { useState } from "react"
import AppTitle from "./scripts/title"
import AppBody from "./scripts/body"

const INI_STATUS = {
    status: "none",
    message: ""
}

const App = () => {
    
    const [status, setStatus] = useState(INI_STATUS)
    const [data, setData] = useState({})

    const updateStatus = data => {
        setStatus(data)
    }

    const updateData = data => {
        setData(data)
    }

    return(
        <div>
            <AppTitle />
            <AppBody appStatus = {status} appData = {data} updateStatus = {updateStatus} updateData = {updateData}/>
        </div>
    )
}

export default App