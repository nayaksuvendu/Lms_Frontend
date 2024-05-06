import React from 'react'
import HomeLayout from '../layout/HomeLayout.jsx'
import HomePageImage from '../assets/Images/homePageMainImage.png'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <HomeLayout>
    <div className=' pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
    <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold ">
                        Find out best
                        <span className="text-yellow-500 font-bold ml-3">
                            Online Courses
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200 ">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    <div className="space-x-5">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className=" sm:mt-3 border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300 ">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                
                <div className="w-1/2 flex items-center justify-center">
                    <img alt="homepage image" src={HomePageImage} />
                </div>  
    </div>
    </HomeLayout>
 
  )
}
