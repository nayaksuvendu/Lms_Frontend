import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";

const initialState={
    // getting all items from localStorage//DB
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || false,
    data: (localStorage.getItem('data') === 'undefined') ? {} : JSON.parse(localStorage.getItem('data'))  //.parse -> convert object to json
};

//sending dispatched value to server
export const createAccount = createAsyncThunk('/auth/signup',async(data)=>{
try{
 const res = axiosinstance.post('user/register',data); // sending data to specified server url
 toast.promise(res,{
    loading:"wait! creating your account",
    success:(data)=>{ return data?.data?.message},
    error:(data)=>{ return data?.data?.message} , 
 })
 return (await res).data;

}
catch(error){
toast.error('Somthing went wrong!')
}
})

export const login = createAsyncThunk('/auth/login',async(data)=>{
    try{
     const res = axiosinstance.post('user/login',data); // sending data to specified server url
     toast.promise(res,{
        loading:"wait! authentication on progress...",
        success:(data)=>{ return data?.data?.message},
        error:(data)=>{ return data?.data?.message}, 
     })
     return (await res).data;
    
    }
    catch(error){
    toast.error(error)
    }
    })


 export const logout = createAsyncThunk('/auth/logout',async()=>{
        try{
         const res= axiosinstance.post('user/logout'); 
         toast.promise(res,{
            loading:"wait! logout in progress...",
            success:(data)=>{ return data?.data?.message},
            error: (data)=>{ return data?.data?.message},
         })
         
         return (await res).data;
        }
        catch(e){           
        toast.error(e?.response?.data?.message)
       
        }
        })


 export const updateUser = createAsyncThunk('/user/editprofile',async(data)=>{
            try{
             const res = axiosinstance.put(`user/update/${data[0]}`, data[1]); 
             toast.promise(res,{
                loading:"wait! profile update in progress...",
                success:(data)=>{ return data?.data?.message},
                error:(data)=>{ return data?.data?.message}
             }) 
             return (await res).data;
            }
            catch(e){     
            // toast.error("Failed to update user Profile")
            console.log(e)
            }
            })

 export const getUserProfile = createAsyncThunk('/user/profile',async()=>{
                try{
                 const res = axiosinstance.post('user/me');
                 toast.promise(res,{
                  loading:"wait! profile is loading...",
                  success:(data)=>{ return data?.data?.message},
                  error:(data)=>{ return data?.data?.message}
               })  
                 return (await res).data;
                }
                catch(e){    
               //  toast.error(e?.response?.data?.message)
               console.log(e)
                }
                }) ;
                
  export const changePassword = createAsyncThunk('/user/changepassword',async(userPassword)=>{
   try {
     const res = axiosinstance.post('/user/change-password',userPassword);
     toast.promise(res,{
      loading:"wait!  loading...",
      success:(data)=>{ return data?.data?.message},
      error: 'Failed to change password'
   })
   return (await res).data
      
   } catch (error) {
      toast.error(error?.response?.data?.message);
   }
  });

  export const forgetPassword = createAsyncThunk('/auth/forgetPassword',async(email)=>{
   try {
     const res =  axiosinstance.post('/user/forget',email);

     toast.promise(res,{
      loading:"wait! loading...",
      success:(data)=>{ return data?.data?.message},
      error: 'Failed to send verification link'
   })
   return (await res).data
      
   } catch (error) {
      toast.error(error?.response?.data?.message);
   }
  });

  export const resetPassword = createAsyncThunk('/user/reset',async(data)=>{
   try {
     const res = axiosinstance.post(`/user/reset/${data.resetToken}`,{password: data.password});
     toast.promise(res,{
      loading: "wait! Resetting...",
      success:(data)=>{ return data?.data?.message},
      error: 'Failed to reset password'
   })
   return (await res).data
      
   } catch (error) {
      toast.error(error?.response?.data?.message);
   }
  });

  
  
    

//create slice
const AuthSlice = createSlice({
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
        .addCase(getUserProfile.fulfilled,(state,action) => {         
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);  
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user.role;
          })
    }
});

//  export const {} = AuthSlice.actions; // export a bunch of value
 export default AuthSlice.reducer; // export paticular value