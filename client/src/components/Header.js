// import modules
import React, {useState} from "react";
import { Link } from "react-router-dom";
import {FiMenu} from "react-icons/fi";

// import components
import Dropdown from './Dropdown';

export default function Header() {
    const[dropdown, setDropdown] = useState(false);
    let dropdownUI
    
    let toggleDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    }

    if(dropdown) {
        dropdownUI = <Dropdown/>;
    }

    return (
        <div>
            <nav className="flex flex-row bg-red-500 lg:h-16 h-12 shadow-xl shadow-red-200">
                <h1 className="ml-2 sm:ml-8 my-auto text-xl lg:text-3xl sm:text-xl font-medium text-white">StudyBuddy</h1>
                <div className="ml-2 my-auto w-1/2 text-center 2xl:ml-40 lg:ml-16 sm:ml-2">
                    <Link to='/user-profile' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>User Profile</Link>
                    <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Find a match</Link>
                    <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-12 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Message</Link>
                </div>
                <p className="hidden sm:block my-auto lg:text-xl text-md text-white lg:ml-12 sm:ml-4">Welcome <span className='font-medium lg:text-2xl text-md'>Archie</span></p>

                <div className='ml-auto my-auto mr-4'>
                    <FiMenu className=" text-white text-3xl lg:text-5xl font-medium hover:text-amber-300" onClick={toggleDropdown}/>
                </div>
                
            </nav>

            {dropdownUI}
        </div>
    )
}