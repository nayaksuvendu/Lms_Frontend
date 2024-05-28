import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";

const initialState = {
    lectures : []
};

export const addCourseLectures = createAsyncThunk(('/course/addLectures'),async(data)=>
{
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosinstance.post(`/courses/${data.id}`,formData)
        
        toast.promise(response,{
            loading: "adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        })
        console.log((await response).data)
        return (await response).data
        
    } catch (error) {
        console.log(error?.response?.message)
        
    }
});

export const getCourseLecture = createAsyncThunk(('/course/displaylectures'),async(id)=>
    {
        try {

            const response = axiosinstance.get(`/courses/${id}`)
            toast.promise(response,{
                loading: "Loading course lectures",
                success: "Lectures loaded successfully",
                error: "Failed to load the lectures"   
            })
            return (await response).data
            
        } catch (error) {
            console.log(error?.response?.message)
            
        }
    });

export const deleteLecture = createAsyncThunk(('lectures/delete'),async(data)=>
        {
            try {
                const response = axiosinstance.delete(`/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`); // passing as a query 
                toast.promise(response,{
                    loading: "deleting course lecture",
                    success: "Lecture deleted successfully",
                    error: "Failed to delete the lectures"
        
                })
                return (await response).data
                
            } catch (error) {
                console.log(error?.response?.message)
                
            }
        });    

const lecturesSlice = createSlice({
    name:'lecture',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getCourseLecture.fulfilled,(state,action)=>{
            state.lectures = action?.payload?.lectures;
        })

    }
}) 

export default lecturesSlice.reducer;


