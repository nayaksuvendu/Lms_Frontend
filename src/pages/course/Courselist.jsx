import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getallCourses } from '../../Redux/Slices/CourseSlice.js';
import Coursecard from '../../component/courseCard/Coursecard.jsx';

export default function Courselist() {
    const dispatch = useDispatch();

    const {courseData} = useSelector((state)=>state.course); // get data from course reducer from Store.jsx

    async function loadCourse(){
        await dispatch(getallCourses());
    }

    useEffect(()=>{
        loadCourse()
    },[]) // refresh only once

  return (
    <HomeLayout>
        <div className=' min-h-[90vh] pl-20 flex flex-col gap-10 text-white '>
            <h1 className=' text-center text-3xl font-bold mb-5'>
                Explore the courses made by{" "}
                <span className=' font-bold text-yellow-500'>
                Industry experts
                </span>
            </h1>
            <div className='flex flex-shrink gap-10 '>
                {courseData?.map((element)=>{
                   return <Coursecard key={element._id} data={element}/>
                }
                )}
            </div>
        </div>
    </HomeLayout>
)
}
