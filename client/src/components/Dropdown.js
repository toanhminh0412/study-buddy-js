import React from "react";
import {Link} from "react-router-dom";

export default function Dropdown() {
    
    let logOut = () => {

        window.localStorage.setItem('userId', "")

        fetch('/api/logout/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className='bg-red-500 w-28 lg:w-40 right-0 absolute'>
            <ul className='flex flex-col text-center'>
                <Link to='/' className="sm:hidden text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Profile</Link>
                <Link to='/' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Match</Link>
                <Link to='/' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Message</Link>
                <Link to='/' className="text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Option</Link>
                <Link to='/' className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Option</Link>
                <Link to='/login' className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300 cursor-pointer" onClick={logOut}>Logout</Link>
            </ul>
        </div>
    )
}