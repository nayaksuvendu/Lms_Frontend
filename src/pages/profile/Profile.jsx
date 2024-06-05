import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../Redux/Slices/AuthSlice.js';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice.js';
import toast from 'react-hot-toast';

export default function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

const userDetails =  useSelector((state) => state?.auth?.data);


async function handleCancelletion(){
    await dispatch(cancelCourseBundle());
    dispatch(getUserProfile());
    toast.success('Canceletion completed!');
    navigate('/');

}
  useEffect(()=>{},[userDetails]);

  return (

   <HomeLayout>

    <div className=' min-h-[90vh] flex justify-center items-center'>
        <div className='my-10 flex flex-col gap-4 rounded-lg text-white w-[30rem] shadow-[0_0_10px_black] '>
            <img 
            className=' w-52 m-auto  rounded-full  border-4 border-white mt-1'
            src={userDetails?.avatar?.secure_url} alt="image" />
            <h3
            className='text-xl font-semibold text-center capitalize text-yellow-500 font-serif'
            >{userDetails?.fullname}
            </h3>
            <div className='grid grid-cols-2 gap-1  mx-4'>
                <p>Email :</p><p>{userDetails.email}</p>
                <p>Role :</p><p>{userDetails.role}</p>
                <p>Subscription :</p>
                <p>{userDetails?.subscribtion?.status === "active" ? "Action" :"Inactive"}</p>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <Link
                to="/user/changepassword"
                className=" w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center "
                >
                <button>Change password</button>
                </Link>
                <Link
                to="/user/editprofile"
                className=" w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                >
                <button>Edit profile</button>
                </Link>
            </div>
            {userDetails?.subscribtion?.status === "active" && (
                <button className='w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center'
                    onClick={() => handleCancelletion()} >
                    Cancle Subscription
                </button>
            )}

        </div>

    </div>

   </HomeLayout>
  )
}
