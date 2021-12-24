// import modules
import React, {useState} from "react";
import { Link } from "react-router-dom";
import {IoMdArrowDropdown} from "react-icons/io";
import {FiMenu} from "react-icons/fi";

export default function Header() {


    return (
        <nav className="flex flex-row bg-red-500 lg:h-16 h-12 shadow-xl shadow-red-200">
            <h1 className="ml-2 sm:ml-8 my-auto text-xl lg:text-3xl sm:text-xl font-medium text-white">StudyBuddy</h1>
            <div className="ml-2 my-auto w-1/2 text-center 2xl:ml-40 lg:ml-16 sm:ml-2">
                <Link to='/user-profile' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>User Profile</Link>
                <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Find a match</Link>
                <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Message</Link>
            </div>
            <p className="hidden sm:block my-auto lg:text-xl text-md text-white lg:ml-12 sm:ml-4">Welcome <span className='font-medium lg:text-2xl text-md'>Archie</span></p>
            <div className="hidden sm:block my-auto h-6 w-6 sm:h-8 sm:w-8 ml-1 text-center rounded-full flex flex-col justify-center bg-orange-300">
                <IoMdArrowDropdown className='text-xl sm:text-2xl my-auto text-white font-light'/>
            </div>
            
            <div className='flex flex-col justify-end sm:hidden my-auto ml-20'>
                <div>
                    <FiMenu className=" text-white text-3xl font-medium"/>
                </div>
                <div>
                    <ul>
                        <li>User Profile</li>
                        <li>Match</li>
                        <li>Message</li>
                    </ul>
                </div>
            </div>
            
        </nav>
    )
}