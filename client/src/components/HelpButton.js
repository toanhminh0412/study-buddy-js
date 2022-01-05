import React, { useState } from "react";
import { GrClose } from 'react-icons/gr';

export default function HelpButton(props) {
    const [instruction, setInstruction] = useState(false);

    if (!instruction) {
        if (props.userPic || props.userForm) {
            return (
                <div onClick={() => {setInstruction(true)}} className='absolute top-36 right-8 md:right-24 lg:right-32 border border-green-700 hover:border-green-900 rounded-md w-16 h-8 text-center flex flex-col justify-center cursor-pointer'>
                    <p className='text-lg text-green-700 hover:text-green-900'>Help</p>
                </div>
            )
        }
        if (props.userDetails) {
            return (
                <div onClick={() => {setInstruction(true)}} className='absolute top-[22rem] right-100 sm:top-28 md:top-36 lg:top-64 xl:top-36 sm:right-8 md:right-16 lg:right-16 xl:right-32 border border-green-700 hover:border-green-900 rounded-md w-16 h-8 text-center flex flex-col justify-center cursor-pointer'>
                    <p className='text-lg text-green-700 hover:text-green-900'>Help</p>
                </div>
            )
        } else {
            return (
                <div onClick={() => {setInstruction(true)}} className='absolute top-40 sm:top-48 xl:top-36 right-8 md:right-24 lg:right-32 border border-green-700 hover:border-green-900 rounded-md w-16 h-8 text-center flex flex-col justify-center cursor-pointer'>
                    <p className='text-lg text-green-700 hover:text-green-900'>Help</p>
                </div>
            )
        }
        
    } else {
        if(props.userPic) {
            return (
                <div className='absolute top-36 w-fit h-fit p-6 bg-white shadow-md rounded-md z-20 border sm:right-8 md:right-24 lg:right-32'>
                    <div className='w-fit ml-auto mr-2'>
                        <GrClose onClick={() => {setInstruction(false)}}/>
                    </div>
                    <ul className='mt-4 lg:text-2xl'>
                        <li className='mt-2 md:mt-4'>1. Choose a profile picture by clicking on "Choose file"</li>
                        <li className='mt-2 md:mt-4'>2. Click "Post" to add the picture</li>
                        <li className='mt-2 md:mt-4'>3. If no photo was selected, a default photo will be set as your profile picture</li>
                    </ul>
                </div>
            )
        }
        if(props.userForm) {
            return (
                <div className='absolute top-36 w-fit h-fit p-6 bg-white shadow-md rounded-md z-20 border sm:right-8 md:right-24 lg:right-32'>
                    <div className='w-fit ml-auto mr-2'>
                        <GrClose onClick={() => {setInstruction(false)}}/>
                    </div>
                    <ul className='mt-4 lg:text-2xl'>
                        <li className='mt-2 md:mt-4'>1. Fill out the form on the left to build your user profile. </li>
                        <li className='mt-2 md:mt-4'>2. For subjects, add one subject at a time. Type out the name of the subject, click "add" then repeat on all of desired subjects.</li>
                        <li className='mt-2 md:mt-4'>3. For understanding level, describe how comfortable you are with the subjects you selected.</li>
                        <li className='mt-2 md:mt-4'>4. For availability, describe it in words. For example: 4pm-10pm every Tuesday, every weekends, etc.</li>
                        <li className='mt-2 md:mt-4'>5. For location, you can type out your exact address or just the city you live in. Totally up to you.</li>
                    </ul>
                </div>
            )
        }

        if(props.userDetails) {
            return (
                <div className='absolute top-36 w-fit h-fit p-6 bg-white shadow-md rounded-md z-20 border sm:right-8 md:right-24 lg:right-32'>
                    <div className='w-fit ml-auto mr-2'>
                        <GrClose onClick={() => {setInstruction(false)}}/>
                    </div>
                    <ul className='mt-4 lg:text-2xl'>
                        <li className='mt-2 md:mt-4'>1. You can see all currently active users on this page</li>
                        <li className='mt-2 md:mt-4'>2. Click on the like button if you want to have a chance to study with a person</li>
                        <li className='mt-2 md:mt-4'>3. If you are not interested in studying with a person, simply click the red next button</li>
                    </ul>
                </div>
            )
        }

        if (props.userLikes) {
            return (
                <div className='absolute top-36 w-fit h-fit p-6 bg-white shadow-md rounded-md z-20 border sm:right-8 md:right-24 lg:right-32'>
                    <div className='w-fit ml-auto mr-2'>
                        <GrClose onClick={() => {setInstruction(false)}}/>
                    </div>
                    <ul className='mt-4 lg:text-2xl'>
                        <li className='mt-2 md:mt-4'>1. You can see all users that hit like on you</li>
                        <li className='mt-2 md:mt-4'>2. Click on the like button on the user container if you want to study with them. If you like the person, you guys will be matched</li>
                    </ul>
                </div>
            )
        }

        if (props.userMatches) {
            return (
                <div className='absolute top-36 w-fit h-fit p-6 bg-white shadow-md rounded-md z-20 border sm:right-8 md:right-24 lg:right-32'>
                    <div className='w-fit ml-auto mr-2'>
                        <GrClose onClick={() => {setInstruction(false)}}/>
                    </div>
                    <ul className='mt-4 lg:text-2xl'>
                        <li className='mt-2 md:mt-4'>1. You can see all users that you match with</li>
                        <li className='mt-2 md:mt-4'>2. Click on the message button to message them directly</li>
                        <li className='mt-2 md:mt-4'>3. Click on the x button to dislike them. They will be found in your like list instead and you can always readd them</li>
                    </ul>
                </div>
            )
        }
        
        return (
            <div></div>
        )
    }
}