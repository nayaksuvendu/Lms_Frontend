import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import { BsPersonCircle } from 'react-icons/bs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';
import { createAccount } from '../Redux/Slices/AuthSlice.js';

export default function Login() {
    const navigate=useNavigate(); // for jump to specified page
    const dispatch=useDispatch();

    const[previewImage,setPreviewImage]=useState("")

    const[signupData,setSignupData]=useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })
     // data store in state
    function handleUserInput(e){
        const{name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    function getImage(event){
        event.preventDefault(); // it prevent default behaviour of an event i.e. it prevent direct upload
        //getting image
        const uploadedImage=event.target.files[0] // bcz we upload single image that store in 0th index
        if(uploadedImage){
            setSignupData({
             ...signupData,
            avatar:uploadedImage
            })
            const fileReader= new FileReader;
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function () {setPreviewImage(fileReader.result)})
        }
    }

    async function createNewAccount(event){
        event.preventDefault(); // prevent to submit for validation
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("Please fill all details");
            return
        }

        //checking name field length
        if(signupData.fullName.length < 5){
           toast.error("Name should be atleast of 5 characters")
           return 
        }
        
        //Email validation
        if(!signupData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            toast.error("Invalid email id")
            return
        }

        //Password validation
        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6 - 16 character long with atleast a number and special character")
            return

        }
    
        const formData = new FormData();
        formData.append("fullname",signupData.fullName)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("avatar",signupData.avatar);

        // dispatch formDta to AuthSlice through craeteAsyncThank/AsynccreateAccount action
        const response= await dispatch(createAccount(formData));
        if(response?.payload?.success){
            navigate('/');// comes to homePage
        }
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""

        })
        setPreviewImage("");

    }



  return (
    <HomeLayout>
    <div className='flex overflow-y-auto items-center justify-center min-h-[90vh] '>
        <form noValidate autoFocus onSubmit={createNewAccount}  className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] mt-10'>
            <h1 className=' text-center text-2xl font-bold ' >Registration Page</h1>
            <label htmlFor="avatar">

                {previewImage ? ( <img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>)
                : (<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>)
                }

            </label>
            <input type="file"
            name='avatar'
            id='avatar'
            className='hidden'
            onChange={getImage}
            accept='.jpg,.png,.jpeg,.svg'
            />
            <div className='flex flex-col gap-1'>
                <label htmlFor="fullName" className='font-semibold '>Name</label>
                <input type="text" 
                required
                name='fullName'
                id='fullName'
                placeholder='Enter your name...'
                className=' bg-transparent px-2 py-1 border '
                onChange={handleUserInput}
                value={signupData.fullName}
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email " className='font-semibold '>Email</label>
                <input type="email"
                required
                name='email'
                id='email'
                placeholder='Enter your Email...'
                className='bg-transparent px-2 py-1 border '
                onChange={handleUserInput}
                value={signupData.email}
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
                value={signupData.password}
                />
            </div>

            <button type='submit' className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                Create Account
            </button>

            <p className='text-center'>
                Already have an account ? <Link to='/Login' className='link text-blue-500 cursor-pointer'>
                login</Link>
            </p>
        </form>
    </div>
    </HomeLayout>
  )
}
