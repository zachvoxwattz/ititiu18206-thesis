import '../css/outputlog.css'

const OutputLog = (props) => {

    let outputData = props.bodyData
    let outputStatus = props.bodyStatus

    return (
        <div id = 'appOutputLog'>
            {
                outputStatus.status === 'none' ?
                    <p id = 'outputLogInitial'>Fill out the field and click the Generate button!</p>
                    :
                    null
            }

            {
                outputStatus.status === 'error' ?
                    <p id = 'outputLogError'>{outputStatus.message}</p>
                    :
                    null
            }

            {
                outputStatus.status === 'pending' ?
                    <p id = 'outputLogPending'>Working on it...</p>
                    :
                    null
            }

            {
                outputStatus.status === 'success'?
                    <p id = 'outputLogSuccess'>Operation Success</p>
                    :
                    null
            }

            {
                outputStatus.status === 'completed' ?
                    <p id = 'outputLogCompleted'>Here you go!<br/><br/>[{outputData.sampleArray.toString()}]</p>
                    :
                    null
            }
        </div>
   )
}

export default OutputLog
