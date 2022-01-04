import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {RiMessage2Line} from "react-icons/ri";
import { AiTwotoneLike } from "react-icons/ai";
import { GrClose } from 'react-icons/gr';

export default function LikedUserContainer(props) {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({});

    const messageBuilder = (receiverId, receiverPic, receiverName) => {
        window.localStorage.setItem('receiverId', receiverId);
        window.localStorage.setItem('receiverPic', receiverPic);
        window.localStorage.setItem('receiverName', receiverName);
        navigate('/message')
    }

    const currentUserId = window.localStorage.getItem('userId');

    // Add a person to like array
    const addLike = (senderId, receiverId) => {
        fetch('/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "senderId": senderId,
                "receiverId": receiverId
            })
        }).then(response => response.json())
        .then(data => {
            setUser(null)
        })
        .catch((error) => {
            console.log(error);
        })
        
    }

    const unLike = (senderId, receiverId) => {
        fetch('/api/unlike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "senderId": senderId,
                "receiverId": receiverId
            })
        })
        .then(response => response.json())
        .then(data => {
            setUser(null);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetch(`/api/profiles/${props.userId}`)
        .then(response => response.json())
        .then(data => {
            setUser(data.userProfile);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    if (!user) {
        return (<div></div>)
    } else {
        if (!props.match) {
            return (
                <div className='flex flex-row mb-8 mt-4 shadow-lg mx-auto sm:w-11/12 md:w-4/6 xl:w-1/2 cursor-pointer rounded-md relative'>
                    <img onClick={() => {navigate(`/likes/${props.userId}`)}} className='w-52 h-52 md:w-60 md:h-72' src={user.profilePic} alt='profile-img'></img>
                    <div className='ml-4 mt-2 sm:mt-4 lg:ml-10 '>
                        <h1 onClick={() => {navigate(`/likes/${props.userId}`)}} className='text-2xl font-medium md:text-4xl hover:text-red-600'>{user.name}</h1>
                        <p className='text-lg md:text-xl md:mt-4'>{user.department}, year {user.studyYear}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Subjects: {user.subjects}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Availability: {user.availability}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Located at {user.location}</p>
                        <div onClick={() => {addLike(currentUserId, props.userId)}} className='ml-52 mt-2 md:mt-4 bg-green-500 hover:bg-green-700 rounded-full w-12 h-12 flex flex-col justify-center absolute right-3 bottom-3 lg:right-6 lg:bottom-4'>
                            <AiTwotoneLike className='text-3xl text-green-200 ml-2'/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='flex flex-row mb-8 mt-4 shadow-lg mx-auto sm:w-11/12 md:w-4/6 xl:w-1/2 rounded-md relative'>
                    <img className='w-52 h-52 md:w-60 md:h-72' src={user.profilePic} alt='profile-img'></img>
                    <div className='ml-4 mt-2 sm:mt-4 lg:ml-10 '>
                        <h1 onClick={() => {navigate(`/likes/${props.userId}`)}} className='text-2xl font-medium md:text-4xl hover:text-red-600 cursor-pointer'>{user.name}</h1>
                        <p className='text-lg md:text-xl md:mt-4'>{user.department}, year {user.studyYear}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Subjects: {user.subjects}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Availability: {user.availability}</p>
                        <p className='text-lg md:text-xl md:mt-2'>Located at {user.location}</p>
                        <div className='ml-52 mt-2 md:mt-4 absolute right-3 bottom-3 lg:right-6 lg:bottom-4 flex flex-row'>
                            <div className="bg-red-500 hover:bg-red-900 rounded-full w-12 h-12 flex flex-col justify-center mr-3">
                                <GrClose onClick={() => unLike(currentUserId, props.userId)} className="text-3xl text-white ml-2"/>
                            </div>
                            <div onClick={() => {messageBuilder(props.userId, user.profilePic, user.name)}} className="bg-cyan-700 hover:bg-cyan-900 rounded-full w-12 h-12 flex flex-col justify-center">
                                <RiMessage2Line className="text-3xl text-cyan-200 ml-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }   
    }   
}