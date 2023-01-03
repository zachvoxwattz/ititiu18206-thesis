import '../../../../assets/css/eventprocessor/status_console/main.css'

const StatusConsole = (props) => {
    let passedData = props.appUtils.processorStatus
        let status = passedData.status
        let message = passedData.message
        let postMessage = passedData.postMessage
        let errorCode = passedData.errorCode

    return(
        <div id = 'eventReplayerConsole'>
            {
                status === 'error_remote' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMerrorlabel'>An error has occurred. HTTP CODE: {errorCode} - RESPONSE FROM SERVER:</p>

                        {
                            postMessage ?
                                <div>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMerrorvalue'>{'\n' + message}</p>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMerrorvalue'>{postMessage}</p>
                                </div>
                                : 
                                <p className = 'eventReplayerConsoleMsgValue ERCMerrorvalue'>{'\n\n' + message}</p>
                        }
                    </div> : null
            }

            {
                status === 'error_local' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMerrorlabel'>A local error has occurred:</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMerrorvalue'>{'\n\n' + message }</p>
                    </div> : null
            }

            {
                status === 'pending' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMpending'>Processing request...</p>
                    </div> : null
            }

            {
                status === 'success_perftest' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccess_perftest'>{'\n\n' + message}</p>
                    </div> : null
            }

            {
                status === 'success_import' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccesslabel'>External file imported successfully</p>
                        {
                            postMessage ?
                                <div>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMsuccessvalue'>{'\n' + message}</p>
                                    <p className = 'eventReplayerConsoleMsgValue ERCMoversized'>{postMessage}</p>
                                </div>
                                : 
                                <p className = 'eventReplayerConsoleMsgValue ERCMsuccessvalue'>{'\n\n' + message}</p>
                        }
                    </div> : null
            }

            {
                status === 'success_import_collector' ?
                    <div>
                        <p className = 'eventReplayerConsoleMsgLabel ERCMsuccesslabel'>Selected event(s) from Collector view imported successfully</p>
                        <p className = 'eventReplayerConsoleMsgValue ERCMsuccessvalue'>{'\n\n' + message}</p>
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
