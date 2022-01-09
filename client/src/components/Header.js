// import modules
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {FiMenu} from "react-icons/fi";
import {BsFillBellFill} from 'react-icons/bs';
import {VscBellDot} from 'react-icons/vsc';
import { useNavigate } from "react-router-dom";

// import components
import Dropdown from './Dropdown';
import NotificationDropdown from "./NotificationDropdown";

// import from firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from '../App';

export default function Header() {
    const navigate = useNavigate();
    const[dropdown, setDropdown] = useState(false);
    const [notificationList, setNotificationList] = useState([])
    const[notificationDropdown, setNotificationDropdown] = useState(false);
    const [notificationAlert, setNotificationAlert] = useState(false);
    const [value, setValue] = useState(0);
    let dropdownUI;
    let notificationDropdownUI;
    
    const userId = window.localStorage.getItem('userId');

    const forceUpdate = () => {
        console.log('force update');
        setValue(value+1);
    }

    const getNotification = async () => {
        const notificationDocSnap = await getDoc(doc(db, "notifications", userId));
        if (notificationDocSnap.exists()) {
            if(notificationDocSnap.data().notifications.length > 0) {
                setNotificationAlert(true);
                if (notificationDocSnap.data().notifications.length < 3) {
                    setNotificationList(notificationDocSnap.data().notifications);
                } else {
                    setNotificationList(notificationDocSnap.data().notifications.slice(notificationDocSnap.data().notifications.length-3, notificationDocSnap.data().notifications.length));
                }
            }
        }
    }

    useEffect(() => {
        if (userId !== "" && userId !== null) {
            getNotification();
        }

        if (userId === "" && userId !== null) {
            console.log('empty notification list')
            setNotificationList([]);
        }
    }, [userId]);
    
    
    let toggleDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    }

    let toggleNotificationDropdown = (notiUp) => {
        if (notificationDropdown) {
            setNotificationDropdown(false);
        } else {
            setNotificationDropdown(true);
        }

        setNotificationAlert(false);

    }

    if(dropdown) {
        dropdownUI = <Dropdown closeFunction={() => {setDropdown(false)}} headerRerenderFunction={forceUpdate}/>;
    }

    if(notificationDropdown) {
        notificationDropdownUI = <NotificationDropdown notifications={notificationList} closeFunction={() => {setNotificationDropdown(false)}}/>
    }

    return (
        <div>
            <nav className="flex flex-row bg-gradient-to-r from-red-500 to-orange-500 lg:h-16 h-12 shadow-xl shadow-red-200">
                <h1 onClick={() => {navigate('/')}} className="ml-2 sm:ml-8 my-auto text-xl lg:text-3xl sm:text-xl font-medium text-white cursor-pointer">StudyBuddy</h1>
                <div className="ml-2 my-auto w-7/12 text-center 2xl:ml-40 lg:ml-16 sm:ml-2">
                    <Link to='/user-profile' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>User Profile</Link>
                    <Link to='/' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Scroll</Link>
                    <Link to='/likes' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Likes</Link>
                    <Link to='/matches' className='hidden sm:inline-block ml-2 2xl:ml-32 lg:ml-14 sm:ml-4 2xl:text-2xl lg:text-xl text-white hover:text-amber-400'>Matches</Link>
                </div>
                
                <div className='w-fit ml-auto my-auto mr-8 relative'>
                    {(notificationAlert && userId)  ? <VscBellDot className="text-white text-2xl md:mr-0 lg:mr-4 lg:text-4xl font-medium hover:text-amber-300" onClick={toggleNotificationDropdown}/>
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