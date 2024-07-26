
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './components/Landing'
// import { Room } from './components/Room'

function App() {
 
    return <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>} />
            {/* <Route path='/room' element={<Room />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
}

export default App
