import React from "react";
import {AiTwotoneLike} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im';

export default function UserProfileDetails(props) {
    const user = props.user;

    if (props.owner) {
    return (
        <div className='sm:flex sm:flex-row'>
            <img src={user.profilePic} alt='Profile-pic' className='w-screen h-72 sm:w-1/2 sm:h-screen'></img>
            <div>
                <div className='sm:mt-8 sm:ml-4 md:ml-10 lg:ml-24 xl:ml-36 xl:mt-16'>
                    <h1 className='text-2xl font-medium mt-1 ml-1 sm:text-4xl lg:text-6xl'>{user.name}<span className='text-xl ml-2 sm:text-2xl lg:text-3xl'>({user.age})</span></h1>
                    <p className='text-lg ml-1 italic lg:text-2xl'>{user.status}</p>
                </div>
                <div className='mt-2 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-16 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Department: {user.department}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Year: {user.studyYear}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Subjects: {user.subjects}</p>
                </div>

                <div className='mt-4 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Style: {user.studyingStyle}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Level: {user.description}</p>
                </div>

                <div className='mt-4 w-80 mb-4 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Location: {user.location}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Availability: {user.availability}</p>          
                </div>
            </div>
        </div>
    )} else {
        return (
        <div className='sm:flex sm:flex-row'>
            <img src={user.profilePic} alt='Profile-pic' className='w-screen h-72 sm:w-1/2 sm:h-screen'></img>
            <div>
                <div className='sm:mt-8 sm:ml-4 md:ml-10 lg:ml-24 xl:ml-36 xl:mt-16'>
                    <h1 className='text-2xl font-medium mt-1 ml-1 sm:text-4xl lg:text-6xl'>{user.name}<span className='text-xl ml-2 sm:text-2xl lg:text-3xl'>({user.age})</span></h1>
                    <p className='text-lg ml-1 italic lg:text-2xl'>{user.status}</p>
                </div>
                <div className='mt-2 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-16 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Department: {user.department}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2'>Year: {user.studyYear}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2'>Subjects: {user.subjects}</p>
                </div>

                <div className='mt-4 w-80 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Style: {user.studyingStyle}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Level: {user.description}</p>
                </div>

                <div className='mt-4 w-80 mb-4 sm:mt-8 sm:ml-4 border border-orange-300 rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-4/5 lg:mt-12 xl:ml-36 xl:w-11/12'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Location: {user.location}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Availability: {user.availability}</p>          
                </div>

                <div className='absolute flex flex-row top-76 right-4 sm:top-auto sm:right-16 sm:mt-12 lg:right-24 lg:mt-24 xl:right-36'>
                    <div className='w-16 h-16 bg-green-500 rounded-full hover:bg-green-700 duration-200'>
                        <AiTwotoneLike className='text-green-100 text-5xl font-medium ml-2 mt-1'/>
                    </div>
                    <div onClick={props.passFunction} className='ml-4 w-16 h-16 bg-red-500 rounded-full hover:bg-red-700 duration-200'>
                        <ImArrowRight className='text-red-200 text-5xl font-medium ml-2 mt-2'/>
                    </div>
                </div>
            </div>
        </div>

        
        )
    }
}