// import modules
import React from "react";

export default function UserProfile() {
    let user_profile = true
    if (user_profile) {
        return (
            <div>
                <h1 className='font-medium text-5xl mt-8'>Build User Profile</h1>
                <form>
                    <label for='name'>Name:</label>
                    <input type="text" name="name"/>
                    <label for='age'>Age:</label>
                    <input type="number" name="age"/>
                    <label for='studyYear'>Study year:</label>
                    <input type="number" name="studyYear"/>
                    <label for='profilePic'>Profile picture:</label>
                    <input type="file" name="profilePic"/>
                    <label for='department'>Department:</label>
                    <input type="text" name="department"/>
                    <label for='subject1'>Subject 1:</label>
                    <input type='text' name='subject1'/>
                    <label for='subject2'>Subject 2:</label>
                    <input type='text' name='subject2'/>
                    <label for='studyingStyle'>Studying style:</label>
                    <select name='studyingStyle'>
                        <option value='individual'>Quiet/Individual work</option>
                        <option value='group'>Discussion/Group work</option>
                    </select>
                    <label for='description'>Description of yourself:</label>
                    <input type='text' name='description'/>
                    <label for='status'>Status:</label>
                    <select name='status'>
                        <option value='partner'>Look for a long term study partner</option>
                        <option value='group'>Look for a study group</option>
                        <option value='homework'>Look for someone to help with homework</option>
                        <option value='review'>Look for some to review class material with</option>
                        <option value='test'>Look for test review partner</option>
                    </select>
                    <label for='availability'>Availability (describe in words):</label>
                    <input type='text' name='availability'/>
                    <label for='location'>Location</label>
                    <input type='text' name='location'/>
                    <input type='submit' value='Post'/>
                </form>
            </div>
        )
    } else {
        return (
            <h1>nothing is here</h1>
        )
    }
    
}