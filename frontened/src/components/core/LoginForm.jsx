import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"


import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { login } from "../../services/operations/authApi"

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)


    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))


    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4 flex-flex-col items-center justify-center text-center"
        >
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                    Email Address <sup className="text-pink-200"> * </sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                    }}
                    className="w-[400px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-white"
                />
            </label>

            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                    Password <sup className="text-pink-200"> * </sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                    }}
                    className="w-[400px] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-white"
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {
                        showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }
                </span>

            </label>

            <button className="mt-6 rounded-[8px] w-[400px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Sign In
            </button>
        </form>
    )
}

export default LoginForm