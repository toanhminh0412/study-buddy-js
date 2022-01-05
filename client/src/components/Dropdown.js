import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Dropdown(props) {
    const navigate = useNavigate();

    let logOut = () => {
        props.headerRerenderFunction();
        props.closeFunction();
        window.localStorage.setItem('userId', "")
        window.localStorage.setItem('name', "")
        window.localStorage.setItem('age', "")
        window.localStorage.setItem('studyYear', "")
        window.localStorage.setItem('profilePic', "")
        window.localStorage.setItem('department', "")
        window.localStorage.setItem('subjects', "")
        window.localStorage.setItem('studyingStyle', "")
        window.localStorage.setItem('description', "")
        window.localStorage.setItem('status', "")
        window.localStorage.setItem('availability', "")
        window.localStorage.setItem('location', "")
        window.localStorage.setItem('receiverName', "")
        window.localStorage.setItem("receiverId", "");
        window.localStorage.setItem('locationGeo', "")
        window.localStorage.setItem('editPic', "false")
        window.localStorage.setItem('editDetails', "false")

        window.localStorage.setItem('liked_people', JSON.stringify([]))

        fetch('/api/logout/users')
        .then(response => response.json())
        .then(data => {
            navigate('/login')
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className='bg-red-500 w-28 lg:w-40 right-0 absolute z-30'>
            <ul className='flex flex-col text-center'>
                <Link onClick={props.closeFunction} to='/user-profile' className="sm:hidden text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Profile</Link>
                <Link onClick={props.closeFunction} to='/' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Scroll</Link>
                <Link onClick={props.closeFunction} to='/likes' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Likes</Link>
                <Link onClick={props.closeFunction} to='/matches' className="text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Matches</Link>
                <Link onClick={props.closeFunction} to='/' className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Option</Link>
                <li className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300 cursor-pointer" onClick={logOut}>Logout</li>
            </ul>
        </div>
    )
}