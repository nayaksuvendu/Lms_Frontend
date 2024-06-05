import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRazorPayId, purchesCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice.js';
import {BiRupee} from 'react-icons/bi'


export default  function CheckoutPage() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {razorpayKey,subscription_id} = useSelector((state)=>state?.razorpay);
  const userData = useSelector((state)=>state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id : "",
    razorpay_subscription_id : "",
    razorpay_signature : ""
  }

async function handleSubscription(e){  
  e.preventDefault();

  if(!razorpayKey || !subscription_id){
    toast.error("Something went wrong");
    return;
  }
  const options ={ // providing details to razorpay Payment Page
    key : razorpayKey,
    subscription_id : subscription_id,
    name : "Nayak Tutorials",
    description : "Subcription",
    currency: "INR",
    amount:"1",
    theme :{
      color: '#F37254'
    },
    prefill: {
      email: userData.email,
      name: userData.fulName
    },
    handler: async function(response){
      paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
      paymentDetails.razorpay_signature = response.razorpay_signature;
      paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
      toast.success("payment successfully");
       const res = await dispatch(verifyUserPayment(paymentDetails));

       res?.payload?.success ? navigate('/payment/success') : navigate('/payment/fail');

    }

  }
  const paymentObject = new window.Razorpay(options) ;
  await paymentObject.open(); // open payment window
}

async function load(){
   dispatch(getRazorPayId());
   dispatch(purchesCourseBundle())
}

useEffect(()=>{load()},[])

    
  return (
    <HomeLayout>
      <form 
      onSubmit={handleSubscription}
      className=' min-h-[90vh] flex items-center justify-center text-white'
      >
        <div className='w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
          <h1
          className=' bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'
          >Subscription Bundle</h1>
          <div className=' px-4 space-x-5 text-center'>
            <p className=' text-yellow-500 font-bold'>
            This purchase will allow you to access all available course of our platform for {" "} 
              <span className=' text-yellow-500 font-bold'>
                <br />
                1 Year duration
              </span>{" "}
              All the existing and new launched courses will be also available
            </p>
            <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>              
              <BiRupee/><span className=' text-lime-500'>499</span>only
            </p>
            <div className=' text-gray-200'>
              <p>100% refund on cancellatio</p>
              <p>* Terms and conditions applied *</p>
            </div>
            <button
            type='submit'
            className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full 
             text-xl font-bold rounded-bl-lg rounded-br-lg py-2 right-0 '
            >
              Buy now
            </button>

          </div>
        </div>

      </form>

    </HomeLayout>
  )
}
