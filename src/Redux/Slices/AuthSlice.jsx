import { createSlice } from "@reduxjs/toolkit";


const initialState={
    // getting all items from localStorage//DB
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || false,
    data:localStorage.getItem('data') || {}
};

const authSlice = createSlice({
    name:'auth', //slice name
    initialState,
    reducers: {}
});

 export const {}= authSlice.actions; // export a bunch of value
 export default authSlice.reducer; // export paticular value