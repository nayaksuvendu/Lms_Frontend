import {useDispatch,useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../component/Footer'



export default function HomeLayout({children}) {
 
  const dispatch= useDispatch();
  const navigate= useNavigate();

  //for checking if user is looged in
  const isLoggedIn= useSelector((state)=> state?.auth?.isLoggedIn);

  // for display according to role
  const role= useSelector((state)=>state?.auth?.role);

  function handleLogout(e){
    e.preventDefault();
    //const res = await dispatch(logout());
    // if(res?.payload?.success)
      navigate('/');
  }
  
  return (
    <div className=' min-h-[90vh]'>

<div className="min-h-[90vh]">

<div className="drawer absolute left-0 z-50 w-full">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* <!-- Navbar --> */}
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2">Navbar Title</div>
      <div className="flex-none hidden lg:block">
        <ul className=" menu menu-horizontal">
          {/* <!-- Navbar menu content here --> */}
          {!isLoggedIn && (
        <li className=' relative '>
          <div className=' w-full flex items-center justify-center gap-4'>
            <button className=' btn-active bg-lime-800 px-4 py-1 font-semibold rounded-md w-full'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn-active bg-red-700 px-4 py-1 font-semibold rounded-md w-full '>
              <Link to='/signup'> Signup</Link>
            </button>
          </div>
        </li>
      )} 

      {isLoggedIn && (
        <li className='relative w-[90%]'>
          <div className='w-full flex items-center justify-center'>
            <button className=' btn-active bg-lime-800 px-4 py-1 font-semibold rounded-md w-full'>
              <Link to='/user/profile'>Profile</Link>
            </button>
            <button className='btn-active bg-red-700  px-4 py-1 font-semibold rounded-md w-full '>
              <Link  onClick={handleLogout}>Logout</Link>
            </button>
          </div>
        </li>
      )}                  
        <li className='flex'><a>Navbar Item 1</a></li>  
          
          { isLoggedIn && role=='ADMIN' && 
            (<li>
              <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>)
          }
        </ul>
      </div>
    </div>
    {/* <!-- Page content here --> */}
    {children}
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
                            <Link to="/contact">Contact Us</Link>
                        </li>

                        <li>
                            <Link to="/Aboutus">About Us</Link>
                        </li>

      {!isLoggedIn && (
        <li className='absolute bottom-9 w-[80%] '>
          <div className=' w-full flex items-center justify-center  gap-4'>
            <button className=' btn-active bg-lime-800 px-4 py-1 font-semibold rounded-md w-full'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn-active bg-red-700 px-4 py-1 font-semibold rounded-md w-full '>
              <Link to='/signup'> Signup</Link>
            </button>
          </div>
        </li>
      )} 

      {isLoggedIn && (
        <li className='absolute bottom-9 w-[90%]'>
          <div className='w-full flex items-center justify-center'>
            <button className=' btn-active px-4 py-1 font-semibold rounded-md w-full'>
              <Link to='/user/profile'>Profile</Link>
            </button>
            <button className=' btn-success  px-4 py-1 font-semibold rounded-md w-full '>
              <Link  onClick={handleLogout}>Logout</Link>
            </button>
          </div>
        </li>
      )}                  
      
                        
    </ul>
  </div>
  
</div>

</div>

<Footer/>

</div>
  )
}
