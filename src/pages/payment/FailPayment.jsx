import React from 'react'
import HomeLayout from '../../layout/HomeLayout'
import {RxCrossCircled} from 'react-icons/rx'
import { Link } from 'react-router-dom'

export default function FailPayment() {
  return (
    <HomeLayout>
    <div className='min-h-[90vh] flex items-center justify-center text-white'>

      <div className='w-80 h-[26rem] flex flex-col justify-center items-center
                      shadow-[0_0_10px_black] rounded-lg relative '>
        <h1 className='bg-red-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'>
          Payment Failed
        </h1>
        <div className=' text-center space-y-2'>
          <h2 className='text-lg font-semibold'>Oops ! Your payment failed</h2>
          <p className=' text-left'>Please try again later</p>
        </div>
        <RxCrossCircled className='text-red-500 text-8xl mt-8 '/>
      

      <Link to='/payment/checkout' 
      className='w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg
       bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0'>
      <button>Try again</button>
      </Link>

      </div>

    </div>

  </HomeLayout>
  )
}
