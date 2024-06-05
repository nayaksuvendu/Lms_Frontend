import React from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../Redux/Slices/AuthSlice';
import { useState } from 'react';

export default function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data,setData] = useState(
        {
            password:"",
            cnfPassword:"",
            resetToken: useParams().resetToken
        }
    );

    function handleOnChange(e){
        const{name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })

    }
    async function handleOnSubmit(e){
          e.preventDefault();

          if (!data.password || !data.cnfPassword || !data.resetToken) {
            toast.error("All fields are mandatory");
            return;
          }

          if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
            toast.error(
              "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
            );
            return;
          }

          if (data.password !== data.cnfPassword) {
            toast.error("Both password should be same");
            return;
          }
          // console.log(useParams().resetToken)
          const res = await dispatch(resetPassword(data));

         // redirecting to the login page
          if (res.payload?.success) {
            navigate("/login");
          }

    }
  return (
    <HomeLayout>
        <div
        onSubmit={handleOnSubmit}
        className="flex items-center justify-center min-h-[90vh]"
      >
        {/* forget password card */}
        <form className="flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-80 h-[22rem] shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold shadow-md h-9">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="cnfPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              name="cnfPassword"
              id="cnfPassword"
              placeholder="Confirm your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.cnfPassword}
              onChange={handleOnChange}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>


    </HomeLayout>
  )
}
