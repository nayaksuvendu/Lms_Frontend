import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import Aboutimage from '../assets/Images/aboutMainImage.png'
import apj from '../assets/Images/apj.png'
import einstein from '../assets/Images/einstein.png'
import stevejobs from '../assets/Images/steveJobs.png'
import nelsonMandela from '../assets/Images/nelsonMandela.png'
import CraosualSlide from '../component/CraosualSlide'
import { Celebreties } from '../constants/CelebretiData'


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
            {Celebreties  && Celebreties.map((celebrity) =>(
            <CraosualSlide {...celebrity} key={celebrity.slideNumber}
           totalSlide={Celebreties.length}
          />))}
        </div> 

    </div>
    </div> 
   
    </HomeLayout>
  )
}
