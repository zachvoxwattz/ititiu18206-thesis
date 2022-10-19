import { useState } from "react"
import AppTitle from "./scripts/title"
import AppBody from "./scripts/body"

const App = () => {
    
    const [feedback, setFeedback] = useState("")

    const updateData = data => {
        setFeedback(data)
    }

    return(
        <div>
            <AppTitle />
            <AppBody appData={feedback} updateData={updateData}/>
        </div>
    )
}

export default App