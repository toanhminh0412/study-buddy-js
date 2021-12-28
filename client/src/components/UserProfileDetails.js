import React from "react";

export default function UserProfileDetails() {
    let userProfilePic = window.localStorage.getItem('profilePic');
    const userName = window.localStorage.getItem('name');
    // let userProfilePic = 'img/1640711211626-profile_pic.jpg'

    return (
        <div>
            <img src={userProfilePic} alt='Profile-pic' className='w-full h-80'></img>
            <h1>{userName}</h1>
        </div>
    )
}