import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import Aboutimage from '../assets/Images/aboutMainImage.png'
import apj from '../assets/Images/apj.png'
import einstein from '../assets/Images/einstein.png'
import stevejobs from '../assets/Images/steveJobs.png'
import nelsonMandela from '../assets/Images/nelsonMandela.png'


export default function Aboutpage() {

  return (

    <HomeLayout >
     <div>
        <div className=' pl-20 pt-10 flex flex-col text-white space-y-3 '>
            <div className='flex items-center gap-5 mx-10 '>
                <section className=' w-1/2 space-y-5'>
                    <h1 className=' text-5xl text-yellow-500 font-semibold'>
                     Affordable and quality education
                    </h1>
                    <p className=' text-xl text-gray-200 fill-red-600 line-clamp-3 '>
                    Our goal is to provide the afoordable and quality education to the world.We are providing the platform for the aspiring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind.  
                    </p>
                </section>

                <div>
                    <img className=' drop-shadow-2xl saturate-200 '
                    src={Aboutimage} alt="image" />
                </div> 
               </div> 
            


        <div className=" lg:relative carousel w-1/2 bottom-32 h-28 ">

       <div id="slide1" className="carousel-item relative w-full">
          <div className="flex flex-cols items-center justify-center gap-4 px-[15%]">
            <img src={nelsonMandela} className=" w-20 rounded-full border-2 border-gray-400" />
            <p className="font-thin text-gray-200">
            {'"Education is the most powerful tool you can use to change the world."'}
            </p>
           <h3 className=" text-nowrap font-semibold">Nelson Mandela</h3>
           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
           <a href="#slide4" className="btn btn-circle">❮</a> 
           <a href="#slide2" className="btn btn-circle">❯</a>
           </div>
         </div> 
        </div>

  <div id="slide2" className="carousel-item relative w-full">
    <div className="flex flex-cols items-center justify-center gap-4 px-[15%]">
      <img src={apj} className="w-20 rounded-full border-2 border-gray-400" />
        <p className=" font-thin text-gray-200">
        {' "Education is the most powerful tool you can use to change the world." '}
        </p>
        <h3 className=" text-nowrap font-semibold"> A.P.J Abdual kalam</h3>
     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
     </div>
    </div> 
   </div>
  
   <div id="slide3" className="carousel-item relative w-full ">
    <div className="flex flex-cols items-center justify-center gap-4 px-[15%]">
      <img src={einstein} className="w-20 rounded-full border-2 border-gray-400" />
        <p className=" text-thin text-gray-200">
        {'"Education is the most powerful tool you can use to change the world."'}
        </p>
        <h3 className="text-nowrap font-semibold">Albert Einstein</h3>
     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
     </div>
    </div> 
    </div>

    <div id="slide4" className="carousel-item relative w-full">
     <div className="flex flex-cols items-center justify-center gap-4 px-[15%]">
      <img src={stevejobs} className="w-20 rounded-full border-2 border-gray-400" />
        <p className="text-thin text-gray-200">
        {'"Education is the most powerful tool you can use to change the world."'}
        </p>
        <h3 className="text-nowrap font-semibold">Steve Jobs</h3>
     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
     </div>
     </div> 
    </div>

    </div>
    </div>

    </div>
    
   
    </HomeLayout>
  )
}
