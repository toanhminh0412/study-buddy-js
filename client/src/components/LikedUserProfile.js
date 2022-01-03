import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Login from "./Login";

export default function LikedUserProfile() {
    const [user, setUser] = useState({})
    let { userId } = useParams();
    
    useEffect(() => {
        fetch(`/api/profiles/${userId}`)
        .then(response => response.json())
        .then(data => {
            setUser(data.userProfile);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    // console.log(user);

    const currentUserId = window.localStorage.getItem('userId');
    if (currentUserId === "") {
        return (<Login/>)
    }

    if (!user) {
        return (
            <div className='w-screen h-screen flex flex-col justify-center'>
                <h1 className="text-center text-6xl mb-20">Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className='sm:flex sm:flex-row'>
            <img src={user.profilePic} alt='Profile-pic' className='w-screen h-72 sm:w-1/2 sm:h-screen'></img>
            <div>
                <div className='sm:mt-8 sm:ml-4 md:ml-10 lg:ml-24 xl:ml-36 xl:mt-16'>
                    <h1 className='text-2xl font-medium mt-1 ml-1 sm:text-4xl lg:text-6xl'>{user.name}<span className='text-xl ml-2 sm:text-2xl lg:text-3xl'>({user.age})</span></h1>
                    <p className='text-lg ml-1 italic lg:text-2xl'>{user.status}</p>
                </div>
                <div className='mt-2 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-16 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Department: {user.department}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Year: {user.studyYear}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Subjects: {user.subjects}</p>
                </div>

                <div className='mt-4 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Style: {user.studyingStyle}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Level: {user.description}</p>
                </div>

                <div className='mt-4 w-80 mb-4 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Location: {user.location}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Availability: {user.availability}</p>          
                </div>
            </div>
        </div>
        )
    }
}