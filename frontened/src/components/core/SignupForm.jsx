import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constant'
import Tab from './common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { setSignupData } from '../../slices/authSlice'
import { signup } from '../../services/operations/authApi'

const SignupForm = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })



    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("All fields aree required.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        // const signupData = {
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     confirmPassword,
        //     accountType
        // };

        // dispatch(setSignupData(signupData))

        dispatch(signup(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

            navigate))

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }


    // , lastName,confirmPassword 
    const { firstName, lastName, email, password, confirmPassword } = formData
    // if (!firstName || !lastName || !email || !password || !confirmPassword) {
    //     toast.error("All fields are required.");
    //     return;
    // }

    // data to pass to Tab component
    // const tabData = [
    //     {
    //         id: 1, 
    //         tabName: "Student",
    //         type: ACCOUNT_TYPE.STUDENT,
    //     },
    //     {
    //         id: 2, 
    //         tabName: "Instructor",
    //         type: ACCOUNT_TYPE.INSTRUCTOR,
    //     },
    // ]

    return (
        <div className='flex flex-col justify-center items-center mt-10'>


            {/* Student-Instructor Tab */}

            <div>

                <button
                    className={`${accountType === "Student"
                        ? "bg-richblack-900 text-richblack-5"
                        : " bg-transparent text-richblack-200"}
                  
                    py-2 px-5 rounded-full transition-all duration-200
                  `}
                    onClick={() => setAccountType("Student")}
                >
                    Student
                </button>

                <button
                    className={`${accountType === "Instructor"
                        ? "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"}
                    py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("Instructor")}
                >
                    Admin
                </button>

            </div>

            {/* <Tab tabData={tabData} field={accountType} setField={setAccountType}/> */}

            <form onSubmit={handleOnSubmit} className="flex  flex-col justify-center items-center gap-y-4">

                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-400">
                        First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder="Enter First Name"
                        style={{
                            boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[400px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-500"
                    />
                </label>

                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-500">
                        Last Name <sup className="text-pink-200"> * </sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder="Enter Last Name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[400px]  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>


                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-500">
                        Email Address <sup className="text-pink-200"> * </sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter Email Address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[400px]  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>


                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-500">
                        Create Password <sup className="text-pink-200"> * </sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px 0px -1px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[400px]  rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>


                <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-500">
                        Confirm Password <sup className="text-pink-200"> * </sup>
                    </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[400px]  rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>


                <button
                    type="submit"
                    className="mt-6 w-[400px]  rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>

            </form>



        </div>
    )
}

export default SignupForm