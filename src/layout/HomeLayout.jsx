import {useDispatch,useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../component/Footer'
import { logout } from '../Redux/Slices/AuthSlice.js';
import{FiMenu} from 'react-icons/fi'

export default function HomeLayout({children}){
 
  const dispatch= useDispatch();
  const navigate= useNavigate();

  //for checking if user is looged in
  const isLoggedIn= useSelector((state)=> state?.auth?.isLoggedIn);

  // for display according to role
  const role= useSelector((state)=>state?.auth?.role);

  async function handleLogout(e){
    e.preventDefault(); //oppose default behaviour
    const res = await dispatch(logout());
    if(res?.payload?.success)
      navigate('/');
  }
  
  return (
    

<div className="min-h-[90vh]">


 <div className="drawer absolute left-0 z-50 w-full">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">

    {/* <!-- Navbar --> */}
    <div className="w-full navbar bg-base-300">
      <div className="flex-none">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"> <FiMenu 
                            size={"32px"}
                            className="font-bold text-white m-4"
                        /></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2 font-serif font-bold text-xl"><span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent text-white'>Nayak Tutorials</span></div>
      <div className="flex-none hidden lg:block">
        <ul className=" menu menu-horizontal">

          {/* <!-- Navbar menu content here --> */}
          {!isLoggedIn && (
        <li className=' relative hover:bg-transparent'>
          <div className=' w-full flex items-center justify-center gap-4 shadow-none'>
            <button className=' btn-active bg-lime-400 px-4 py-1 font-semibold rounded-md w-full text-white'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn-active bg-cyan-400 px-4 py-1 font-semibold rounded-md w-full text-white '>
              <Link to='/signup'> Signup</Link>
            </button>
          </div>
        </li>
      )} 

      {isLoggedIn && (
        <li className='relative hover:shadow-none '>
          <div className='w-full flex items-center justify-center '>
            <button className=' btn-active bg-lime-400 px-4 py-1 font-semibold rounded-md w-full text-white'>
              <Link to='/user/profile'>Profile</Link>
            </button>
            <button className='btn-active bg-red-500  px-4 py-1 font-semibold rounded-md w-full text-white '>
              <Link  onClick={handleLogout}>Logout</Link>
            </button>
          </div>
        </li>
      )}                  
        {/* <li className='flex'><a>Navbar Item 1</a></li>   */}
          
{/*           { isLoggedIn && role=='ADMIN' && 
            (<li>
              <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>)
          } */}

        </ul>
      </div>
    </div>
    {/* <!-- Page content here --> */}
  </div>
   
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 relative">
      {/* <!-- Sidebar content here --> */}

      { isLoggedIn && role=='ADMIN' && 
            (<li>
              <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>)
          }
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>

                        <li>
                            <Link to="/contactUs">Contact Us</Link>
                        </li>

                        <li>
                            <Link to="/Aboutus">About Us</Link>
                        </li>

                        { isLoggedIn && role=='ADMIN' && 
                        (<li>
                        <Link to="/course/create">Create Course</Link>
                        </li>)
                        }
                        
      <div className="lg:hidden">
      {!isLoggedIn && (
        <li className='absolute bottom-9 w-[80%] '>
          <div className=' w-full flex items-center justify-center  gap-4'>
            <button className=' btn-active bg-lime-400 px-4 py-1 font-semibold rounded-md w-full text-white'>
              <Link to='/Login'>Login</Link>
            </button>
            <button className='btn-active bg-cyan-400 px-4 py-1 font-semibold rounded-md w-full text-white'>
              <Link to='/Signup'> Signup</Link>
            </button>
          </div>
        </li>
      )} 

      {isLoggedIn && (
        <li className='absolute bottom-9 w-[90%]'>
          <div className='w-full flex items-center justify-center'>
            <button className='btn-active bg-lime-800  px-4 py-1 font-semibold rounded-md w-full'>
              <Link to='/user/profile'>Profile</Link>
            </button>
            <button className=' btn-active bg-red-700  px-4 py-1 font-semibold rounded-md w-full '>
              <Link  onClick={handleLogout}>Logout</Link>
            </button>
          </div>
        </li>
      )}                  
     </div> 
                        
    </ul>
  </div>
  
 </div>
 

 {children}
 <Footer/>
</div>


  )
}
