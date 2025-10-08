import React from 'react'
import logo from '../../assets/logo.jpg';
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 px-4">
            {/* Container */}
            <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[700px] shadow-lg rounded-lg overflow-hidden bg-white">

                {/* الصورة (تظهر فقط في lg وما فوق) */}
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        className="h-full w-full object-cover"
                        src={logo}
                        alt="leftSideImage"
                    />
                </div>

                {/* الفورم */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
                    <form className="w-full max-w-sm flex flex-col items-center justify-center">
                        <h2 className="text-3xl lg:text-4xl text-gray-900 font-medium">Sign up</h2>
                        <p className="text-sm text-gray-500/90 mt-3 text-center">
                            Create a new account to get started
                        </p>

                        {/* زر التسجيل بجوجل */}
                        <button
                            type="button"
                            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
                        >
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                                alt="googleLogo"
                            />
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 w-full my-5">
                            <div className="w-full h-px bg-gray-300/90"></div>
                            <p className="text-sm text-gray-500/90 whitespace-nowrap">or sign up with email</p>
                            <div className="w-full h-px bg-gray-300/90"></div>
                        </div>

                        {/* Name Input */}
                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zM4 20c0-4 4-7 8-7s8 3 8 7"
                                    stroke="#6B7280"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                            <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                type="email"
                                placeholder="Email id"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                            <svg
                                width="13"
                                height="17"
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                        >
                            Sign Up
                        </button>

                        {/* Login Link */}
                        <p className="text-gray-500/90 text-sm mt-4 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-400 hover:underline">
                                Sign in
                            </Link>

                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
