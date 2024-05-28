import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, updateUser } from '../../Redux/Slices/AuthSlice.js';
import HomeLayout from '../../layout/HomeLayout';
import {BsPersonCircle} from 'react-icons/bs'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import toast from 'react-hot-toast';

export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[updateData,setUpdateData] = useState({
        fullname:"",
        previewImage:"",
        avatar:undefined,
        id:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleOnChange(e){
        const{name,value}=e.target;
        setUpdateData({
            ...updateData,
            [name] : value
        })
    }

    function handleImageUpload(e){
        e.preventDefault();
        const uploadImage = e.target.files[0];
     if(uploadImage){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener('load',()=>{
           setUpdateData({
            ...updateData,
            previewImage: fileReader.result,
            avatar: uploadImage
           })
        })
        }
     }
     
    async function onFormSubmit(e){
        e.preventDefault();
        if(!updateData.fullname || !updateData.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if(updateData.fullname.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }
        const formData = new FormData();
        formData.append("fullname",updateData.fullname);
        formData.append("avatar",updateData.avatar);
        // console.log(formData.entries().next()) // print formData

        await dispatch(updateUser([updateData.id,formData]))
        await dispatch(getUserProfile())
        
        navigate('/user/profile')
     }


  return (
    <HomeLayout>
        <div className='flex justify-center items-center h-[90vh]'>
            <form 
            noValidate
            className='flex flex-col justify-center gap-5 rou p-4 text-white  w-80 min-h-[26rem] shadow-[0_0_10px_black]'
            onSubmit={onFormSubmit}
            >
                <h1 className=' text-center text-2xl font-serif'>Edit Profile</h1>
                <label htmlFor="upload_image" className=' cursor-pointer'>
                    {updateData.previewImage?(
                        <img
                        className='w-28 h-28 rounded-full m-auto'
                         src={updateData.previewImage} />
                    ):(<BsPersonCircle className='w-28 h-28 rounded-full m-auto'/>)}
                </label>
                <input 
                type="file" 
                className='hidden'
                onChange={handleImageUpload}
                id='upload_image'
                name='upload_image'
                accept='.jpg,.png,.jpeg'
                />
                <div className='flex flex-col gap-1'>
                    <label htmlFor="fullname"
                    className='text-lg font-semibold'
                    >Full Name</label>
                    <input type="text" 
                    className=' bg-transparent px-2 py-1 border'
                    placeholder='Enter your name'
                    required
                    name='fullname'
                    id='fullname'
                    value={updateData.fullname}
                    onChange={handleOnChange}
                    
                    />
                </div>

                <button
                type='submit'
                className='w-full bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300
                 rounded-sm py-2 text-lg cursor-pointer'
                >
                Update profile
                </button>

                <Link to ='/user/profile'>
                    <p className='link text-accent cursor-pointer flex items-center
                     justify-center w-full gap-2'>
                        <AiOutlineArrowLeft/>Go back to profile</p>
                </Link>
            </form>

        </div>
    </HomeLayout>
  )
}
