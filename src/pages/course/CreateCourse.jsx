import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { createNewCourse } from '../../Redux/Slices/CourseSlice.js';
import HomeLayout from '../../layout/HomeLayout';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import toast from 'react-hot-toast';

export default function CreateCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[userInput,setUserInput] = useState({
    title:"",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null, // for serverSite
    previewImage: "" // for clientSite
  })

  function handleImageUpload(e){
    e.preventDefault();
    const uploadImage= e.target.files[0]
    if(uploadImage){
     const fileReader= new FileReader
     fileReader.readAsDataURL(uploadImage)
     fileReader.addEventListener("load",()=>{
      setUserInput({
        ...userInput,
        previewImage : fileReader.result,
        thumbnail : uploadImage
      })
     })

    }
  }

  function handleUserInput(e){
    const{name,value}= e.target;
    setUserInput({
      ...userInput,
      [name]:value
    })
  }

  async function onformSubmit(e){
    e.preventDefault(); // it change default behaviour(refresh) of Form submit
     
     if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
      toast.error("All fields are mandatory");
      return;
  }
  const response = await dispatch(createNewCourse(userInput));

  if(response?.payload?.success){
    setUserInput({
      title:"",
      category: "",
      createdBy: "",
      description: "",
      thumbnail: null, 
      previewImage: ""
    })
  }
  navigate('/courses')

  }

  return (
   <HomeLayout>
    <div className='flex items-center justify-center h-[90vh]'>
      <form 
      noValidate
      onSubmit={onformSubmit}
      className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white
      w-[700px] my-10 shadow-[0_0_10px_black] relative'
      >
        <Link className='absolute top-8 text-2xl link text-accent cursor-pointer'
         >
        <AiOutlineArrowLeft/>
        </Link>

        <h1 className='text-center text-3xl font-bold shadow-lg h-12'>
          Create New Course
          </h1>

          <main className='grid grid-cols-2 gap-x-10'>

            <div className=' space-y-4'>

              <div>
                <label htmlFor="image_uploads"
                className=' cursor-pointer'
                >
                 {userInput.previewImage ? (<img 
                className='w-full h-40 border m-auto'
                src={userInput.previewImage}
                />) : (
                  <div className='w-full h-40 border m-auto flex items-center justify-center'>
                    <h1 className='font-bold text-lg'>Upload your course thumbnail</h1>
                    </div> 
                )}
                </label>
                <input type='file' 
                required
                className='hidden'
                accept='.jpg, .png , .jpeg'
                id='image_uploads'
                name='image_uploads'
                onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className=' text-lg font-semibold'>
                Course title
                </label>
                <input type="text" 
                 required
                 className='bg-transparent px-2 py-1 border'
                 id='title'
                 name='title'
                 onChange={handleUserInput}
                 value={userInput.title}
                />
              </div>
            </div>
            
            <div className=' space-y-2'>
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className=' text-lg font-semibold'>
                Course Instructor
                </label>
                <input type="text" 
                 required
                 className='bg-transparent px-2 py-1 border'
                 id='createdBy'
                 name='createdBy'
                 onChange={handleUserInput}
                 value={userInput.createdBy}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className=' text-lg font-semibold'>
                Course Category
                </label>
                <input type="text" 
                 required
                 className='bg-transparent px-2 py-1 border'
                 id='category'
                 name='category'
                 onChange={handleUserInput}
                 value={userInput.category}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className=' text-lg font-semibold'>
                Course Description
                </label>
                <textarea 
                 required
                 className='bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none '
                 id='description'
                 name='description'
                 onChange={handleUserInput}
                 value={userInput.description}
                />
              </div>
           </div>

          </main>

          <button type='submit'
          className ='w-full py-2 rounded-sm font-semibold text-lg cursor-pointer
           bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300'
           >
           Create Course
          </button>

      </form>
    </div>
   </HomeLayout>
  )
}
