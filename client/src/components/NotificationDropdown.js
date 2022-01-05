import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown(props) {
    const navigate = useNavigate();
    let notificationId = 0;
    
    const navigateMatch = () => {
        navigate('/matches');
        props.closeFunction();
    }

    const navigateLike = () => {
        navigate('/likes');
        props.closeFunction();
    }

    return (
        <div className='w-60 h-fit absolute right-20 md:right-28 lg:right-32 xl:right-48 z-20 bg-white shadow-md p-2 rounded-md'>
            {props.notifications.map(notification => {
                notificationId = notificationId + 1;
                if (notification.includes('match') || notification.includes('message')) {
                    return (
                        <div onClick={navigateMatch} key={notificationId} className='shadow-md rounded-md bg-gray-100 p-2 hover:shadow-inner cursor-pointer mb-2'>
                            <p>{notification}</p>
                        </div>
                    )
                }
                else {
                    return (
                        <div onClick={navigateLike} key={notificationId} className='shadow-md rounded-md bg-gray-100 p-2 hover:shadow-inner cursor-pointer mb-2'>
                            <p>{notification}</p>
                        </div>
                    )
                }          
            })

            }  
        </div>
    )
}