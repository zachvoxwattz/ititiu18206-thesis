import '../css/outputlog.css'

const OutputLog = (props) => {

    let rawData = props.bodyData

    return(
        <div id='appOutputLog'>
            {
                rawData.length !== 0 ?
                    rawData.error ? 
                        <p id='outputLogError'>{rawData.message}</p>
                        :
                        rawData.sampleArray ?
                            <p id='outputLogSuccess1'>Here you go!<br/><br/>[{rawData.sampleArray.toString()}]</p>
                            :
                            <p id='outputLogSuccess2'>Successfully made a REST call to back end!</p>
                    :
                    <p id='outputLog'>Fill out the field and click the Generate button!</p>
            }
        </div>
    )
}

export default OutputLog
