import loadingIcon from '../../../../assets/images/loading.gif'
import '../../../../assets/css/eventprocessor/status_console/main.css'

const StatusConsole = (props) => {
    let passedData = props.appUtils.processorStatus
        let status = passedData.status
        let message = passedData.message
        let resultData = passedData.resultData
        let postMessage = passedData.postMessage
        let errorCode = passedData.errorCode

    return(
        <div id = 'eventReplayerConsole'>
            {
                status === 'error_remote' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMfailureLabel'>An error has occurred. HTTP CODE: {errorCode} - RESPONSE FROM SERVER:</p>

                        {
                            postMessage ?
                                <div>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMfailedLocal'>{'\n' + message}</p>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMfailedLocal'>{postMessage}</p>
                                </div>
                                : 
                                <p className = 'eventReplayerConsoleMsgValue ERCMfailedLocal'>{'\n\n' + message}</p>
                        }
                    </div> : null
            }

            {
                status === 'error_local' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMfailureLabel'>A local error has occurred:</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedLocal'>{'\n\n' + message }</p>
                    </div> : null
            }

            {
                status === 'pending' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMpending'>Processing request...</p>
                        <div id = 'processingIndicator'>
                            <img className = 'requestPendingIcon' src = {loadingIcon} alt = 'Loading indicator'/>
                        </div>
                    </div> : null
            }

            {
                status === 'success_perftest' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccessLabel'>PERFORMANCE TEST BY EVENT REPLAY SUCCESSFULLY</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessPerfResult'>{`Start time (UNIX timestamps): ${resultData.testStartTime}`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessPerfResult'>{`End time (UNIX timestamps): ${resultData.testEndTime}`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessPerfResult'>{`Runtime: ${resultData.testRuntime}ms`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessPerfResult'>{`Total test data count: ${resultData.totalDataSet}`}</p>
                    </div> : null
            }

            {

                status === 'failed_perftest' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMfailureLabel'>PERFORMANCE TEST BY EVENT REPLAY FAILED</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedPerfResult ERCMfailedLocalSmallerFont'>{`Start time (UNIX timestamps): \t${resultData.testStartTime}`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedPerfResult ERCMfailedLocalSmallerFont'>{`End time (UNIX timestamps): \t${resultData.testEndTime}`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedPerfResult ERCMfailedLocalSmallerFont'>{`Runtime: \t${resultData.testRuntime}ms`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedPerfResult ERCMfailedLocalSmallerFont'>{`Total test data count: \t${resultData.totalDataSet}, \t${parseInt(resultData.totalDataSet) - parseInt(resultData.failureData.failCount)} valid set(s)`}</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMfailedPerfResult ERCMfailedLocalSmallerFont'>{`Reason: ${resultData.failureData.failReason}`}</p>
                    </div> : null
            }

            {
                status === 'success_import' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccessLabel'>External file imported successfully</p>
                        {
                            postMessage ?
                                <div>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMsuccessLocal'>{'\n' + message}</p>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMoversized'>{postMessage}</p>
                                </div>
                                : 
                                <p className = 'eventReplayerConsoleMsgValue ERCMsuccessLocal'>{'\n\n' + message}</p>
                        }
                    </div> : null
            }

            {
                status === 'success_import_collector' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccessLabel'>Selected event(s) from Collector view imported successfully</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessLocal'>{'\n\n' + message}</p>
                        {
                            postMessage ?
                                <p className = 'eventReplayerConsoleMsgValue ERCMoversized'>{postMessage}</p>: null
                        }
                    </div> : null
            }
        </div>
    )
}

export default StatusConsole
