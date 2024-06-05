import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import toast from 'react-hot-toast';
import axiosinstance from '../helper/axiosinstance';

export default function ContactusPage() {

    const[userInput,setUserInput]=useState({
        name:"",
        email:"",
        comment:""
    })

   async function handleInputChange(e){
        const{name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }
    async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.email || !userInput.name || !userInput.comment) {
        toast.error("All fields are mandatory");
        return;    
    }
    if(!userInput.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
     toast.error('Invalid email')
     return;
    }   
    try{
        
        const res =  axiosinstance.post('/contact',userInput)
              toast.promise(res,{
              loading: "Submitting your message...",
              success: "Form submitted successfully",
              error: "Failed to submit the form"   
        })
        if(res?.data?.success){
            setUserInput({
                ...userInput,
                name:"",
                email:"",
                comment:""
            })
        }

     }
    catch(err){
        toast.error("operation failed....") 
    }
  }
  return (
    <HomeLayout>
    <div className=' flex flex-col justify-center items-center h-[90vh]'>
        <form
        noValidate
        className=' flex flex-col items-center justify-center gap-2 p-5
        rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'
        onSubmit={onFormSubmit}
        >
            <h1 className=' text-3xl font-semibold'>Contact us</h1>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="name" className=' text-xl font-semibold'>Name</label>
                <input 
                type= 'text'
                className=' bg-transparent border px-2 py-1 rounded-sm'
                required
                name='name'
                id='name'
                placeholder='Enter your name'
                onChange={handleInputChange}
                value={userInput.name}
                />
            </div>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="email" className=' text-xl font-semibold'>Email</label>
                <input 
                type='text'
                required
                className=' bg-transparent border px-2 py-1 rounded-sm'
                name='email'
                id='email'
                placeholder='Enter your email'
                onChange={handleInputChange}
                value={userInput.email}
                />
            </div>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="comment" className=' text-xl font-semibold'>Comment</label>
                <textarea
                className=' bg-transparent border px-2 py-1 rounded-sm resize-none'
                required
                name='comment'
                id='comment'
                placeholder='Enter your message'
                onChange={handleInputChange}
                value={userInput.comment}
                />
            </div>
            <div className='flex flex-col w-full gap-1'>
                <button
                className=' font-bold bg-yellow-500 border px-2 py-1 rounded-sm group-[ hover:bg-yellow-600 transition-all ease-out duration-300]'
                >Submit</button>

            </div>

        </form>
    </div>
    </HomeLayout>
   
  )
}
