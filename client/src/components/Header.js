// import modules
import React from "react";
import { Link } from "react-router-dom";
import {IoMdArrowDropdown} from "react-icons/io"

export default function Header() {
    return (
        <nav className="flex flex-row bg-red-500 lg:h-16 h-12 shadow-xl shadow-red-200">
            <h1 className="ml-2 sm:ml-12 my-auto lg:text-3xl sm:text-xl font-medium text-white">StudyBuddy</h1>
            <div className="ml-2 my-auto w-1/2 text-center 2xl:ml-40 lg:ml-20 sm:ml-4">
                <Link to='/user-profile' className='ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white'>User Profile</Link>
                <Link to='/' className='ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white'>Find a match</Link>
                <Link to='/' className='ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white'>Message</Link>
            </div>
            <p className="ml-2 my-auto lg:text-xl sm:text-lg text-white ml-32 lg:ml-16 sm:ml-4">Welcome <span className='font-medium lg:text-2xl sm:text-xl'>Archie</span></p>
            <div className="my-auto h-6 w-6 sm:h-8 sm:w-8 sm:ml-4 text-center rounded-full flex flex-column justify-center bg-orange-300">
                <IoMdArrowDropdown className='text-xl sm:text-2xl my-auto text-white font-light'/>
            </div>
        </nav>
    )
}