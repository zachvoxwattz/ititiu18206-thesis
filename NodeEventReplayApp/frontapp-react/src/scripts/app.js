import ConnectDialog from './connectpage'
import MainApp from './mainapp'
import FourOFour from './none';
import { Route, Routes, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path = '/connect' element = {<ConnectDialog />} />
      <Route path = '/app' element = {<MainApp />} />
      <Route path = '/void' element = {<FourOFour />} />
      <Route path = "*" element = {<Navigate to = '/connect' />} />
    </Routes>
  )
}

export default App;
