import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, getCourseLecture } from '../../Redux/Slices/LectureSlice';

export default function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation(); // get sate from /CourseDescription that contain course details
    const {lectures} = useSelector((state)=>state.lecture);
    const {role} = useSelector((state)=>state.auth)

    const [currentVideo,setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId,lectureId){
        await dispatch(deleteLecture({courseId: courseId, lectureId: lectureId}));
        await dispatch(getCourseLecture(courseId));
    }

    useEffect(()=>{
        if(!state) navigate('/courses'); // if state not exist navigate
        dispatch(getCourseLecture(state._id))
    },[])
  return (
    <HomeLayout>
        <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]'>

             {/* Top */}
            <div className='text-center text-2xl font-semibold text-yellow-500 font-serif'>
                <span className=' text-lime-500 '>CourseName :</span>  {state?.title}
            </div>
            
             
            {
              (lectures && (lectures.length > 0)) ?
             
            <div className='flex justify-center gap-10 w-full'>

             {/* leftSide */}

             <div className='space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]'>

                  <video src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                  className='object-fill rounded-tl-lg rounded-tr-lg w-full'
                  controls
                  disablePictureInPicture
                  muted
                  controlsList='nodownload'
                  >
                  </video>
                <div>
                  <h1>
                    <span className = "text-yellow-500" >
                    Title:{" "}
                    </span>
                    {lectures && lectures[currentVideo]?.title}
                  </h1>
                  <p>
                    <span className='text-yellow-500 line-clamp-4'>
                        Description: {" "}
                    </span>
                    {lectures && lectures[currentVideo]?.description}
                  </p>
               </div> 
             </div>

         {/* RightSide */}

         <ul className='w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4'>


            <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
                <p>Lectures List</p>
                {role === 'ADMIN' && (
                            <button onClick={() => navigate("/course/addlectures",{state: {...state}})}
                            className = ' btn-ghost bg-blue-800 text-white px-2 py-2 rounded-md font-semibold text-sm'>
                                Add new lecture
                            </button>
                        )}
            </li>

            {lectures && lectures.map((lecture,idx)=>{ // idx-> index of lecture
                return (
                    <li className="space-y-2" key={lecture._id} >
                        <p className="cursor-pointer text-lime-300" onClick={() => setCurrentVideo(idx)}>
                            <span>{" "} Lecture {idx + 1} :{" "}</span>
                            {lecture?.title}
                        </p>
                        {role === 'ADMIN' && (
                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className=" btn-outline bg-red-500 text-white px-2 py-1 rounded-md font-semibold text-sm">
                                Delete lecture
                            </button>
                        )}
                    </li>
                )
            })}


         </ul>

        </div> : (
                   role === 'ADMIN' && (
                   <button onClick={() => navigate("/course/addLectures",{state: {...state}})}
                    className = 'btn bg-blue-500 text-white  px-2 py-1 rounded-md font-semibold text-sm'>
                     Add new lecture
                     </button>
                   )    
                )
     }

    </div>    
        
    </HomeLayout>
  )
}
