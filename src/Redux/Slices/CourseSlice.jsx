import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosinstance from "../../helper/axiosinstance"
import toast from "react-hot-toast"

const initialState={
    courseData:[]
}

export const getallCourses = createAsyncThunk('/course/get',async()=>{
 try {
    const res= axiosinstance.get('/courses')
    toast.promise(res,{
        loading:'loading course data...',
        success:'Courses loaded successfully',
        error:'Failed to get the courses'
    })
    return (await res).data.course
 } catch (error) {
    toast.error(error?.res?.data?.message)
 }
})

export const createNewCourse = createAsyncThunk('/course/create',async(data)=>{
 try{
    let formData = new FormData();
    
    formData.append('title',data?.title);
    formData.append('description',data?.description);
    formData.append('category',data?.category);
    formData.append('createdBy',data?.createdBy);
    formData.append('thumbnail',data?.thumbnail);

   const response =  axiosinstance.post('/courses',formData)
   toast.promise(response,{
    loading: "Creating new course",
    success: "Course created successfully",
    error: "Failed to create course"
   })
   return (await response).data
}
catch(error){
toast.error(error?.response?.data?.message)
}  

})

const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getallCourses.fulfilled,(state,action)=>{
        if(action.payload){
            state.courseData = [...action.payload];
        }
     })
    }
})

export default courseSlice.reducer;
