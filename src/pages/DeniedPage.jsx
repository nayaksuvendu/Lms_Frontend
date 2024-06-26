import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DeniedPage() {
 const navigate = useNavigate()
  return (
 <div className='h-screen w-full flex flex-col justify-center items-center'>

    <h1 className=' text-9xl font-extrabold text-white tracking-widest'>
        404
    </h1>
    <div className=' bg-black text-white px-2 text-sm rounded rotate-12 absolute'>
        Access denied...
    </div>
    <button className='mt-5'>
        <a className=' inline-block text-sm font-medium text-[#aa22d3] active:text-yellow-500 focus:outline-non focus:ring '>
            <span onClick={() => navigate('/')} className=' block px-8 py-3 bg-[#1A2238] border border-current rounded-md'>
                Go Home              
            </span>
        </a>
    </button>
    
</div>
  )

}
