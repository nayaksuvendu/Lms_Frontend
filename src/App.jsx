
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage.jsx'
import Aboutpage from './pages/Aboutpage.jsx'


function App() {

  
  return (
 <>
 <Routes>
  <Route path='/' element={<Homepage/>}></Route>
  <Route path='/Aboutus' element={<Aboutpage/>}></Route>
 </Routes>
 
 </>
  )
}

export default App
