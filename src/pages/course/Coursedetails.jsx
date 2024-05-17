import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import HomeLayout from '../../layout/HomeLayout';

export default function Coursedetails() {
   const {state} = useLocation() ; //get state from useNavigate from /CourseCard
   const UserData = useSelector(state=>state.auth) // get auth from store.jsx
   const{role,data}=UserData;
  return (
    <HomeLayout>
    <div className='min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white'>
        <div className=' grid grid-cols-2 gap-10 py-10 resize-none'>

            <div className=' space-y-5'>
                <img 
                className=' w-full h-64'
                src={state?.thumbnail?.secure_url}
                alt="thumbnail"
                 />

                <div className=' space-y-4' >
                 <div className='flex flex-col items-center justify-between text-xl'>
                    <p className=' font-semibold'>
                        <span className='text-yellow-500 font-bold'>
                            Total lectures : {" "}
                        </span>
                        {state?.numberOfLectures}
                    </p>
                    <p className=' font-semibold'>
                        <span className='text-yellow-500 font-bold'>
                            Instructor : {" "}
                        </span>
                        {state?.createdBy}
                    </p>
                 </div>
                    {role === "ADMIN" || data?.subscribtion?.status === "ACTIVE" ? (
                        <button className=' bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                            Watch lectures
                        </button>
                    ) :(<button className=' bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                        Subscribe
                    </button>)
                    }

                </div>
            </div>

            <div className=' space-y-4 text-xl'>
                <h1 className='text-center text-3xl font-bold text-yellow-500'>
                    {state?.title}
                </h1>
                <p className='text-yellow-500'>Course Description : </p>
                <p>{state?.description}</p>
            </div>
        </div>
    </div>
    </HomeLayout>
  )
}
