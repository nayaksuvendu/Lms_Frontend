import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";

const initialState={
    // getting all items from localStorage//DB
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || false,
    data: localStorage.getItem('data') || {}
};

//sending dispatched value to server
export const createAccount=createAsyncThunk('/auth/signup',async(data)=>{
try{
 const res=axiosinstance.post('user/register',data); // sending data to specified server url
 toast.promise(res,{
    loading:"wait! creating your account",
    success:(data)=>{ return data?.data?.message},
    error:"Failed to create account"
 })
 return (await res).data;

}
catch(e){
toast.error(error?.response?.data?.message)
}
})

export const login=createAsyncThunk('/auth/login',async(data)=>{
    try{
     const res= axiosinstance.post('user/login',data); // sending data to specified server url
     toast.promise(res,{
        loading:"wait! authentication on progress...",
        success:(data)=>{ return data?.data?.message},
        error:  "Failed to login account"
     })
     return (await res).data;
    
    }
    catch(e){
    toast.error(error?.response?.data?.message)
    }
    })

 export const logout=createAsyncThunk('/auth/logout',async()=>{
        try{
         const res= axiosinstance.post('user/logout'); 
         toast.promise(res,{
            loading:"wait! logout in progress...",
            success:(data)=>{ return data?.data?.message},
            error:"Failed to logout account"
         })
         return (await res).data;
        }
        catch(e){
        toast.error(error?.response?.data?.message)
        }
        })
    

//create slice
const authSlice = createSlice({
    name:'auth', //slice name
    initialState,
    reducers: {},
    extraReducers: (builder) => { // use to responds to an action of anotherSlice
         builder
        .addCase(login.fulfilled,(state,action) => {
          localStorage.setItem("data",JSON.stringify(action?.payload?.data));
          localStorage.setItem("isLoggedIn",true);
          localStorage.setItem("role",action?.payload?.data?.role);  
          state.isLoggedIn = true;
          state.data = action?.payload?.data;
          state.role = action?.payload?.data.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = '';
        })
    }
});

 export const {} = authSlice.actions; // export a bunch of value
 export default authSlice.reducer; // export paticular value