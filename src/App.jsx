
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage.jsx'
import Aboutpage from './pages/Aboutpage.jsx'
import PagenotFound from './pages/PagenotFound.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Courselist from './pages/course/Courselist.jsx'
import ContactusPage from './pages/ContactusPage.jsx'
import Coursedetails from './pages/course/Coursedetails.jsx'
import RequireAuth from './component/auth/RequireAuth.jsx'
import CreateCourse from './pages/course/CreateCourse.jsx'
import DeniedPage from './pages/DeniedPage.jsx'
function App() {  
  return (
 <>
 <Routes>
  <Route path='/' element={<Homepage/>}></Route>
  <Route path='/Aboutus' element={<Aboutpage/>}></Route>
  <Route path='/Signup' element={<Signup/>}></Route>
  <Route path='/Login' element={<Login/>}></Route> 

  <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
  <Route path='/course/create' element={<CreateCourse/>}></Route>
  </Route>
  
  <Route path='/courses' element={<Courselist/>}></Route>
  <Route path='/courses/description' element={<Coursedetails/>}></Route>
  <Route path='/contactUs' element={<ContactusPage/>}></Route>
  <Route path='/denied' element={<DeniedPage/>}></Route>  
  <Route path='*' element={<PagenotFound/>}></Route> 
 </Routes>
 
 </>
  )
}
// "*" -> wrong path or notExisted path

export default App
