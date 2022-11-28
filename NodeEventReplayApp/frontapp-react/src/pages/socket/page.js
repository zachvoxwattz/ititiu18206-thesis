import { useState, useEffect } from 'react'
import { connectSocketIO } from '../../api/socketio'

const SocketIO = () => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (socket === null) {
            setSocket(connectSocketIO(true))
        }

        if (socket) {
            console.log('yes, works')
            console.log(socket)
        }
    }, [socket])

    return(
        <div>
            <h4>Socket IO testing</h4>
        </div>
    )
}

export default SocketIO
