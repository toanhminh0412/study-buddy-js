import React from "react";

export default function UserProfileDetails() {
    const userProfilePic = window.localStorage.getItem('profilePic');
    const userName = window.localStorage.getItem('name');
    const userAge = window.localStorage.getItem('age');
    const userStudyYear = window.localStorage.getItem('studyYear');
    const userDepartment = window.localStorage.getItem('department')
    const userStatus = window.localStorage.getItem('status');
    const userSubjects = window.localStorage.getItem('subjects')
    const userStudyingStyle = window.localStorage.getItem('studyingStyle')
    const userDescription = window.localStorage.getItem('description')
    const userAvailability = window.localStorage.getItem('availability')
    const userLocation = window.localStorage.getItem('location')

    return (
        <div className='sm:flex sm:flex-row'>
            <img src={userProfilePic} alt='Profile-pic' className='w-full h-72 sm:w-1/2 sm:h-full'></img>
            <div>
                <div className='sm:mt-8 sm:ml-4 md:ml-10 lg:ml-24 xl:ml-36'>
                    <h1 className='text-2xl font-medium mt-1 ml-1 sm:text-4xl'>{userName}<span className='text-xl ml-2 sm:text-2xl'>({userAge})</span></h1>
                    <p className='text-lg ml-1 italic'>{userStatus}</p>
                </div>
                <div className='mt-2 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Department: {userDepartment}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Year: {userStudyYear}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Subjects: {userSubjects}</p>
                </div>

                <div className='mt-4 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Style: {userStudyingStyle}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Level: {userDescription}</p>
                </div>

                <div className='mt-4 w-80 mb-4 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Availability: {userAvailability}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Location: {userLocation}</p>
                </div>
            </div>
        </div>
    )
}