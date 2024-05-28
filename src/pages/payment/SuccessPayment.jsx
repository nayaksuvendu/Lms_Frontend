import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import {AiFillCheckCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../Redux/Slices/AuthSlice.js'


export default function SuccessPayment() {

  const dispatch = useDispatch();
   
  useEffect(()=>{dispatch(getUserProfile())},[])
  
  return (
    <HomeLayout>
      <div className='min-h-[90vh] flex items-center justify-center text-white'>

        <div className='w-80 h-[26rem] flex flex-col justify-center items-center
                        shadow-[0_0_10px_black] rounded-lg relative '>
          <h1 className='bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'>
            Payment Successfull
          </h1>
          <div className=' text-center space-y-2'>
            <h2 className='text-lg font-semibold'>Welcome to the pro bundle</h2>
            <p className=' text-left'>Now You can enjoy all the courses <span className=' text-2xl'>🥳</span></p>
          </div>
          <AiFillCheckCircle className='text-green-500 text-8xl mt-8 '/>
        

        <Link to='/' 
        className='w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg
         bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0'>
        <button>Go to dashboard</button>
        </Link>

        </div>

      </div>

    </HomeLayout>
  )
}
