// import modules
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {FiMenu} from "react-icons/fi";
import {BsFillBellFill} from 'react-icons/bs';
import {VscBellDot} from 'react-icons/vsc';

// import components
import Dropdown from './Dropdown';
import NotificationDropdown from "./NotificationDropdown";

// import from firebase
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from '../App';

export default function Header() {
    const[dropdown, setDropdown] = useState(false);
    const [notificationList, setNotificationList] = useState([])
    const[notificationDropdown, setNotificationDropdown] = useState(true);
    const [notificationAlert, setNotificationAlert] = useState(false);
    let dropdownUI;
    let notificationDropdownUI;
    let nameMessage = []

    const unchange = "";
    
    const userId = window.localStorage.getItem('userId');
    
    const notificationDetector = () => {
        onSnapshot(doc(db, "notifications", userId), (doc) => {
            console.log('notification received')
            console.log(doc.data().notifications);
            setNotificationAlert(true);
            setNotificationList(doc.data().notifications.slice(doc.data().notifications.length-3, doc.data().notifications.length));
        })
    }

    useEffect(() => {
        notificationDetector();
    }, [unchange]);
    
    
    let toggleDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    }

    let toggleNotificationDropdown = () => {
        if (notificationDropdown) {
            setNotificationDropdown(false);
        } else {
            setNotificationDropdown(true);
        }
    }

    if(dropdown) {
        dropdownUI = <Dropdown/>;
    }

    if(notificationDropdown) {
        notificationDropdownUI = <NotificationDropdown notifications={notificationList}/>
    }

    return (
        <div>
            <nav className="flex flex-row bg-red-500 lg:h-16 h-12 shadow-xl shadow-red-200">
                <h1 className="ml-2 sm:ml-8 my-auto text-xl lg:text-3xl sm:text-xl font-medium text-white">StudyBuddy</h1>
                <div className="ml-2 my-auto w-7/12 text-center 2xl:ml-40 lg:ml-16 sm:ml-2">
                    <Link to='/user-profile' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>User Profile</Link>
                    <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Scroll</Link>
                    <Link to='/likes' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Likes</Link>
                    <Link to='/matches' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Matches</Link>
                </div>
                
                <div className='w-fit ml-auto my-auto mr-8 relative'>
                    {(notificationAlert && userId)  ? <VscBellDot className="text-red-900 text-2xl md:mr-0 lg:mr-4 lg:text-4xl font-medium hover:text-amber-300" onClick={toggleNotificationDropdown}/>
                                        : <BsFillBellFill className="text-white text-2xl md:mr-0 lg:mr-4 lg:text-4xl font-medium hover:text-amber-300" onClick={toggleNotificationDropdown}/>}
                </div>

                <div className='w-fit ml-auto my-auto mr-4'>
                    <FiMenu className="text-white text-3xl lg:text-5xl font-medium hover:text-amber-300" onClick={toggleDropdown}/>
                </div>
                
            </nav>

            {notificationDropdownUI}
            {dropdownUI}
        </div>
    )
}