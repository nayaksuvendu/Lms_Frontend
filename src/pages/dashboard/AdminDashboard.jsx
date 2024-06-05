import React, { useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,Tooltip} from 'chart.js';
import {Bar,Pie} from 'react-chartjs-2';
import {FaUsers} from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill,BsTrash } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { deleteCourses, getallCourses } from '../../Redux/Slices/CourseSlice';
import { getStatsData } from '../../Redux/Slices/AdminSlice';
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice';



export default function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)

    const {totalUser,totalSubscriber} = useSelector((state)=>state.admin);
    const {allPayments,monthlySalesRecord} = useSelector((state)=>state.razorpay);
    console.log(totalSubscriber);
    const userData = {
        labels:['Registered User','Enrolled User'],
        fontColor:'white',
        datasets:[
            {
                label:"User Details",
                data:[totalUser,totalSubscriber],
                backgroundColor:["yellow","green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            }
        ]
    };

    const salesData = {
        labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor : "white",
        datasets:[{
            label : 'Sales / Month',
            data: monthlySalesRecord,
            backgroundColor:['red'],
            borderColor:['white'],
            borderWidth:2

        }]
    };


    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id){
        if(window.confirm('Are you sure you want to delete the course ? ')){
            const res = await dispatch(deleteCourses(id));
            if(res?.payload?.success){
                await dispatch(getallCourses)
            }
        }
    };

    useEffect(()=>{
     async function fetchData(){
     await dispatch(getallCourses());
     await dispatch(getStatsData());
     await dispatch(getPaymentRecord());
     }
     fetchData()
     },[])


  return (
    <HomeLayout>
       <div className='flex flex-col flex-wrap gap-10 text-white pt-24 min-h-[90vh] '>
        <h1 className='text-center text-5xl font-semibold text-yellow-500'>
            Admin Dashboard
        </h1>
        <div className='grid grid-cols-2 gap-5 m-auto mx-10'>

            <div className='flex flex-col gap-5 p-5 shadow-lg rounded-md'>
                <div className='w-80 h-80'>
                    <Pie data={userData}/>
                </div>
                <div className=' grid grid-cols-2 gap-5'>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Registered Users</p>
                            <h3 className='text-4xl font-bold'>{totalUser}</h3>
                        </div>
                        <FaUsers className=' text-yellow-500 text-5xl'/>
                    </div>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Subscribed Users</p>
                            <h3 className='text-4xl font-bold'>{totalSubscriber}</h3>
                        </div>
                        <FaUsers className=' text-yellow-500 text-5xl'/>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col gap-5 p-5 shadow-lg rounded-md'>
                <div className='w-full h-80 relative'>
                    <Bar className='absolute bottom-0 h-80 w-full' data={salesData} />
                </div>
                <div className=' grid grid-cols-2 gap-5'>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Subscription Count</p>
                            <h3 className='text-4xl font-bold'>{allPayments?.count}</h3>
                        </div>
                        <FcSalesPerformance className=' text-yellow-500 text-5xl'/>
                    </div>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Total Revenue</p>
                            <h3 className='text-4xl font-bold'>{allPayments?.count*499}</h3>
                        </div>
                        <GiMoneyStack className=' text-yellow-500 text-5xl'/>
                    </div>
                </div>
            </div>

        </div>

            <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                <div className='felx w-full items-center justify-between'>
                    <h1 className='text-center text-3xl font-semibold'>
                        Course overview
                    </h1>
                    <button
                    onClick={()=>navigate('course/create')}
                    className='w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer'
                    >
                        Create new course
                    </button>

                </div>

                <table className=' table  overflow-x-scroll '>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Course Title</th>
                            <th>Course Category</th>
                            <th>Instructor</th>
                            <th>Total Lectures</th>
                            <th>Description</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCourses?.map((course,idx)=>{
                            return(
                                <tr key={course._id}>
                                    <td>{idx+1}</td>
                                    <td><textarea readOnly value={course?.title} className='w-40 h-auto bg-transparent resize-none'>
                                        </textarea></td>
                                    <td>{course?.category}</td>
                                    <td>{course?.createdBy}</td>
                                    <td>{course?.numberOfLectures}</td>
                                    <td className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                        <textarea readOnly value={course?.description} className=' w-52 h-auto bg-transparent resize-none'>
                                        </textarea></td>
                                    <td className='lg:space-x-2'>
                                        <button className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                        onClick={()=>navigate('/course/displaylectures',{state:{...course}})}
                                        >
                                            <BsCollectionPlayFill/>
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                        onClick = {()=>onCourseDelete(course?._id)}
                                        >
                                            <BsTrash/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>


        
        </div> 
    </HomeLayout>
  )
}


