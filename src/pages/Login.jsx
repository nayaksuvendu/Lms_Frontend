import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';
import {  login } from '../Redux/Slices/AuthSlice';

export default function Signup() {
    const navigate=useNavigate(); // for jump to specified page
    const dispatch=useDispatch();

    const[loginData,setloginData]=useState({
        email:"",
        password:""
    })

     // data store in state
    function handleUserInput(e){
        const{name,value}=e.target;
        setloginData({
            ...loginData,
            [name]:value
        })
    }

    async function onlogin(event){
        event.preventDefault(); // prevent to submit for validation
        if(!loginData.email || !loginData.password){
            toast.error("Please fill all details");
            return
        }

        //Email validation
        if(!loginData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            toast.error("Invalid email id")
            return
        }

        //Password validation
        if(!loginData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6 - 16 character long with atleast a number and special character")
            return

        }

        // dispatch login/asyncThunk action
        const response= await dispatch(login(loginData));
        if(response?.payload?.success){
            navigate('/');// comes to homePage
        }
        setloginData({
            email: "",
            password: "",
        })

    }



  return (
    <HomeLayout>
    <div className='flex overflow-y-auto items-center justify-center h-[80vh]'>
        <form noValidate autoFocus onSubmit={onlogin}  className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <h1 className=' text-center text-2xl font-bold ' >Login Page</h1>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold '>Email</label>
                <input type="email"
                required
                name='email'
                id='email'
                placeholder='Enter your Email...'
                className='bg-transparent px-2 py-1 border '
                onChange={handleUserInput}
                value={loginData.email}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="Password" className='font-semibold '>Password</label>
                <input type="password" 
                required
                name='password'
                id='password'
                placeholder='Enter your Password...'
                className='bg-transparent px-2 py-1 border'
                onChange={handleUserInput}
                value={loginData.password}
                />
            </div>

            <button type='submit' className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
             Login
            </button>

            <p className='text-center'>
                Don't have an account ? <Link to='/Signup' className='link text-blue-500 cursor-pointer'>
                Signup</Link>
            </p>
        </form>
    </div>
    </HomeLayout>
  )
}
