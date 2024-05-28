import toast from "react-hot-toast";
import axiosinstance from "../../helper/axiosinstance"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    razorpayKey :"",
    subscription_id :"",
    isPaymentVerified : false,
    allPayments :{},
    finalMonths: {},
    monthlySalesRecord :[]
}

export const getRazorPayId = createAsyncThunk('/razorpay/getId',async ()=>{
    try{
        const response = await axiosinstance.get('/payment/razorpay-key');
        return response.data 
    }
    catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export const purchesCourseBundle = createAsyncThunk('/purchasecourse',async()=>{
    try {
        const response = await axiosinstance.post('/payment/subscribe');
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message) 
    }
})

export const verifyUserPayment = createAsyncThunk('/payments/verify',async (data)=>{
    try {
        const response = await axiosinstance.post('/payment/verify',{
            RozerPay_paymentId : data.razorpay_payment_id,
            RzpSubscription_id : data.razorpay_subscription_id,
            RozerPay_signature : data.razorpay_signature
        })
        console.log(response.data)
        return response.data
        
    } catch (error) {
        toast.error(error?.response?.data?.message) 

    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = await axiosinstance.get("/payment?count=100"); // getting latest 100 payment
        toast.promise(response, {
            loading: "Getting the payment record",
            success: (data) => {
                return data?.data?.message
            },
            error: (data) => {
                return data?.data?.message
            }
        })
        return await response.data

    } catch(error) {
        console.log(error)
        toast.error("Operation failed");
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = await axiosinstance.post("/payment/unsubscribe");
        console.log(response)
        toast.promise(response, {
            loading: "unsubscribing the Course",
            success: (data) => {
                return data?.data?.message
            },
            error: (data) => {
                return data?.data?.message
            },
        })
        return response.data
    } catch(error) {
        // toast.error(error?.response?.data?.message);
        console.log(error)
    }
});


// Create Slice
const razorPaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.razorpayKey = action?.payload?.razorpayKey 
        })
        .addCase(purchesCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.sucess;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments = action?.payload?.paymentRecord;
            state.finalMonths = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })        
    }
})

export default razorPaySlice.reducer ;