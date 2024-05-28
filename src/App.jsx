
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
import Profile from './pages/profile/Profile.jsx'
import EditProfile from './pages/profile/EditProfile.jsx'
import Checkout from './pages/payment/CheckoutPage.jsx'
import PaymentFail from './pages/payment/FailPayment.jsx'
import PaymentSuccess from './pages/payment/SuccessPayment.jsx'
import Displaylectures from './pages/dashboard/Displaylectures.jsx'
import AddLectures from './pages/dashboard/AddLectures.jsx'
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx'

function App() {  
  return (
 <>
 <Routes>
  <Route path='/' element={<Homepage/>}></Route>
  <Route path='/Aboutus' element={<Aboutpage/>}></Route>
  <Route path='/Signup' element={<Signup/>}></Route>
  <Route path='/Login' element={<Login/>}></Route> 

  <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
  <Route path = '/course/create' element={<CreateCourse/>}></Route>
  <Route path = '/course/addLectures' element={<AddLectures/>}></Route>
  <Route path = '/admin/dashboard' element={<AdminDashboard/>}></Route>
  </Route>

  <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
  <Route path='/user/profile' element={<Profile/>}></Route>
  <Route path='/user/editprofile' element={<EditProfile/>}></Route>
  <Route path='/payment/checkout' element={<Checkout/>}></Route>
  <Route path='/payment/fail' element={<PaymentFail/>}></Route>
  <Route path='/payment/success' element={<PaymentSuccess/>}></Route>
  <Route path='/course/displaylectures' element={<Displaylectures/>}></Route>
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
