import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSlice from "./Slices/CourseSlice";

export const store=configureStore({
    reducer:{
        auth: AuthSliceReducer,
        course: CourseSlice
    },
    devTools:true // optional 
});

