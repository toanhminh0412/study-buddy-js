// import modules
import React from "react";
import '../css/UserProfile.css';

export default function UserProfile() {
    let user_profile = true
    if (user_profile) {
        return (
            <div>
                <h1 className='font-medium text-5xl mt-8 sm:ml-4 lg:ml-12'>Build User Profile</h1>
                <form className='profile-form mt-4 flex flex-col'>
                    <label className='text-2xl font-light ml-8 lg:ml-20' for='name'>Name</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="name"/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='age'>Age</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="age"/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='studyYear'>Study year</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="studyYear"/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='profilePic'>Profile picture</label>
                    <input className='ml-8 lg:ml-20' type="file" name="profilePic"/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='department'>Department</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="department"/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='subject1'>Subject 1</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject1'/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='subject2'>Subject 2</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject2'/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='studyingStyle'>Studying style</label>
                    <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='studyingStyle'>
                        <option value='individual'>Quiet/Individual work</option>
                        <option value='group'>Discussion/Group work</option>
                    </select>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='description'>Description of yourself</label>
                    <textarea className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 rounded-sm text-xl pl-6' rows='4' name='description'/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='status'>Status</label>
                    <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='status'>
                        <option value='partner'>Look for a long term study partner</option>
                        <option value='group'>Look for a study group</option>
                        <option value='homework'>Look for someone to help with homework</option>
                        <option value='review'>Look for some to review class material with</option>
                        <option value='test'>Look for test review partner</option>
                    </select>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='availability'>Availability (describe in words)</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='availability'/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' for='location'>Location</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='location'/>
                    <input className='w-16 h-8 bg-red-500 hover:bg-red-700 rounded-sm ml-8 lg:ml-20 text-white mt-6 mb-4' type='submit' value='Post'/>
                </form>
            </div>
        )
    } else {
        return (
            <h1>nothing is here</h1>
        )
    }
    
}