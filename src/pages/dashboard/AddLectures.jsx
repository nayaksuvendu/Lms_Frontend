import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addCourseLectures } from '../../Redux/Slices/LectureSlice';
import {AiOutlineArrowLeft} from 'react-icons/ai'

export default function AddLectures() {
  const {state} = useLocation(); // from /displayLecture.jsx
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[userInput,setUserInput] = useState({
    id : state?._id,
    lecture: undefined,
    title: "",
    desrciption: "",
    videoSrc: ""
  })

  function handleInputChange(e){
    const{name,value}= e.target ;
    setUserInput({
        ...userInput,
        [name]: value
    })
  }

  function uploadVideo(e){
    const video = e.target.files[0];
    if(!(video.size <= (50*1024*1024))) { 
      toast.error("Uploaded video size must be less than 50MB!")
      return;
  }    
    const videoUrl = window.URL.createObjectURL(video);
    setUserInput({
        ...userInput,
        lecture:video,
        videoSrc:videoUrl
    })
  }

  async function onFormSubmit(e){
    e.preventDefault();

    if(!userInput.lecture || !userInput.title || !userInput.desrciption) {
        toast.error("All fields are mandatory!")
        return;
    }

    const response = await dispatch(addCourseLectures(userInput))
    if(response?.payload?.success){
        navigate(-1); // go back to prv. page
        setUserInput({
            id: state?._id,
            lecture: undefined,
            title: "",
            description: "",
            videoSrc: ""
    })

    }
  }

  useEffect(()=>{
    if(!state)navigate('/courses')
  },[])

  return (
    <HomeLayout>

        <div className = ' flex flex-col min-h-[90vh] text-white items-center justify-center gap-10 mx-16'>

            <div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg' >

              <header className= 'flex items-center justify-center relative'>
                <button className='absolute left-2 text-xl text-green-500'
                onClick={() => navigate(-1)}
                >
                  <AiOutlineArrowLeft/>
                </button>
                <h1 className='text-xl text-yellow-500 font-semibold'>
                    Add new lecture
                </h1>
              </header>
              <form onSubmit={onFormSubmit} className='flex flex-col gap-3' >

                <input type = "text" 
                       name = 'title'
                       placeholder = 'enter the title of lecture'
                       onChange={handleInputChange}
                       value={userInput.title} 
                       className='bg-transparent px-3 py-1 border'               
                />
                <textarea 
                       name = 'desrciption'
                       onChange = {handleInputChange}
                       value = {userInput.desrciption}
                       placeholder = 'enter the description of the lecture'
                       className ='bg-transparent border resize-none px-3 py-1 overflow-y-scroll h-36 '                
                />
                {(userInput?.videoSrc) ? (
                <video src={userInput.videoSrc}
                controls
                controlsList='nodownload nofullscreen'
                disablePictureInPicture
                className=' object-fill rounded-tl-lg rounded-tr-lg w-full'                
                >
                </video>) : (
                    <div>
                        <label htmlFor="lecture" className=' font-light text-clip cursor-pointer '>
                           <div className='h-48 border flex justify-center items-center cursor-pointer'>
                            <h1 className='font-bold text-lg'>Upload here</h1>
                           </div> 
                        </label>
                        <input type = 'file'
                        className = 'hidden '
                        name= 'lecture'
                        id = 'lecture'
                        onChange={uploadVideo}
                        accept=' video/mp4,video/x-mp4,video/*'
                        />
                    </div>           
                )
            }
                <button type='submit' className=' btn bg-orange-700 py-1 font-semibold text-lg'>
                        Add new Lecture
                    </button>

              </form>

            </div>

        </div>



    </HomeLayout>
  )
}
