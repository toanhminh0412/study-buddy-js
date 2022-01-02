import React from "react";

export default function NotificationDropdown(props) {
    let notificationId = 0;
    return (
        <div className='w-60 h-fit absolute right-20 md:right-28 lg:right-32 xl:right-48 z-20 bg-white shadow-md p-2 rounded-md'>
            {props.notifications.map(notification => {
                notificationId = notificationId + 1;
                return (
                    <div key={notificationId} className='shadow-md rounded-md bg-gray-100 p-2 hover:shadow-inner cursor-pointer mb-2'>
                        <p>{notification}</p>
                    </div>
                )
            })

            }  
        </div>
    )
}