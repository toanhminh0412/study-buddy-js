import React from "react";
import {AiTwotoneLike, AiFillEdit} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im';
import { useNavigate } from "react-router-dom";
import HelpButton from "./HelpButton";

export default function UserProfileDetails(props) {
    const navigate = useNavigate();
    const user = props.user;

    const editProfile = e => {
        window.localStorage.setItem('editPic', "true");
        window.localStorage.setItem('editDetails', "false");
        navigate('/user-profile');
    }

    return (
        <div className='sm:flex sm:flex-row w-screen'>
            {props.owner ? <div></div> : <HelpButton userDetails={true}/>}
            <div className='w-screen h-72 sm:w-3/4 sm:h-screen relative'>
                <img src={user.profilePic} alt='Profile-pic' className='w-full h-full'></img>
            </div>
            <div className='w-full'>
                <div className='mt-4 sm:mt-8 sm:ml-4 md:ml-10 lg:ml-24 xl:ml-36 xl:mt-16 text-center sm:text-left'>
                    <h1 className='text-2xl font-medium mt-1 ml-1 sm:text-4xl lg:text-6xl'>{user.name}<span className='text-xl ml-2 sm:text-2xl lg:text-3xl'>({user.age})</span></h1>
                    <p className='text-lg ml-1 italic lg:text-2xl'>{user.status}</p>
                </div>
                <div className='mx-auto mt-2 w-80 sm:mt-8 sm:ml-4 border rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-3/5 lg:mt-16 xl:ml-36 p-2'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Department: {user.department}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Year: {user.studyYear}</p>
                    <div className='ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 flex flex-row flex-wrap'>
                        <p className="text-xl lg:text-2xl">Subjects: </p>
                        <div className='flex flex-row flex-wrap ml-2'>
                            {user.subjects.map(subject => {
                            return (
                                <div className='shadow-md rounded-md h-10 w-fit text-center pt-2 mr-1 pr-1 bg-gradient-to-r from-red-500 to-orange-500' key={subject}>
                                    <p className='text-lg ml-3 mr-2 text-white'>{subject}</p>  
                                </div>
                            )
                        
                            })}
                        </div>
                    </div>
                </div>

                <div className='mx-auto mt-4 w-80 sm:mt-8 sm:ml-4 border rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-3/5 lg:mt-12 xl:ml-36 p-2'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Style: {user.studyingStyle}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Level: {user.description}</p>
                </div>

                <div className='mx-auto mt-4 w-80 mb-4 sm:mt-8 sm:ml-4 border rounded-md shadow-sm sm:shadow-md shadow-orange-300 md:ml-10 lg:ml-24 lg:w-3/5 lg:mt-12 xl:ml-36 p-2'>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mb-2 sm:mr-2 lg:text-2xl'>Location: {user.location}</p>
                    <p className='text-xl ml-1 sm:ml-2 sm:mt-2 sm:mr-2 lg:text-2xl'>Availability: {user.availability}</p>          
                </div>

                {props.owner ? (
                    <div className='absolute flex flex-row top-76 right-4 sm:top-auto sm:right-16 sm:mt-12 lg:right-24 lg:mt-24 xl:right-36 w-16 h-16 bg-slate-300 rounded-full hover:bg-slate-500 duration-200'>
                    <AiFillEdit onClick={editProfile} className='text-black text-5xl font-medium ml-2 mt-1'/>
                    </div>
                ):
                (<div className='absolute flex flex-row top-76 right-4 sm:top-auto sm:right-16 sm:mt-12 lg:right-24 lg:mt-24 xl:right-36'>
                <div onClick={props.likeFunction} className='w-16 h-16 bg-green-500 rounded-full hover:bg-green-700 duration-200'>
                    <AiTwotoneLike className='text-green-100 text-5xl font-medium ml-2 mt-1'/>
                </div>
                <div onClick={props.passFunction} className='ml-4 w-16 h-16 bg-red-500 rounded-full hover:bg-red-700 duration-200'>
                    <ImArrowRight className='text-red-200 text-5xl font-medium ml-2 mt-2'/>
                </div>
            </div>)} 
                
            </div>
        </div>
    )
}