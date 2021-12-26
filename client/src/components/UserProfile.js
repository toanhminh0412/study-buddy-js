// import modules
import React, {useState} from "react";
import '../css/UserProfile.css';
import Login from "./Login";


export default function UserProfile() {
    let [name, setName] = useState("");
    let [age, setAge] = useState(-1);
    let [studyYear, setStudyYear] = useState(-1)
    let [profilePic, setProfilePic] = useState("")
    let [department, setDepartment] = useState("")
    let [subjects, setSubjects] = useState(Array(2))
    let [studyingStyle, setStudyingStyle] = useState(["Quiet/Individual work"])
    let [description, setDescription] = useState("")
    let [status, setStatus] = useState("Look for a long term study partner")
    let [availability, setAvailability] = useState("")
    let [location, setLocation] = useState("")
    
    let changeName = e => {
        // console.log(e.target.value)
        setName(e.target.value)
        // console.log(name)
    }

    let changeAge = e => {
        setAge(e.target.value)
    }

    let changeStudyYear = e => {
        setStudyYear(e.target.value)
    }

    let changeProfilePic = e => {
        setProfilePic(e.target.value)
        // console.log(e.target.value)
    }

    let changeDepartment = e => {
        setDepartment(e.target.value)
    }

    let changeSubject1 = e => {
        setSubjects([e.target.value, subjects[1]])
    }

    let changeSubject2 = e => {
        setSubjects([subjects[0], e.target.value])
    }

    let changeStudyingStyle = e => {
        setStudyingStyle([e.target.value])
        // console.log(e.target.value)
    } 

    let changeDescription = e => {
        setDescription(e.target.value)
    }

    let changeStatus = e => {
        setStatus(e.target.value)
    }

    let changeAvailability = e => {
        setAvailability(e.target.value)
    }

    let changeLocation = e => {
        setLocation(e.target.value)
    }
    
    let submitUserProfile = e => {
        let userProfile = {
            "name": name,
            "age": age,
            "studyYear": studyYear,
            "profilePic": profilePic,
            "department": department,
            "subjects": subjects,
            "studyingStyle": studyingStyle,
            "description": description,
            "status": status,
            "availability": availability,
            "location": location
        }
        // console.log(userProfile);
        e.preventDefault();
        window.location.href = "/";
        fetch('/api/profiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userProfile),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    let userId = window.localStorage.getItem('userId');
    
    if (userId !== "") {
        return (
            <div>
                <h1 className='font-medium text-5xl mt-8 sm:ml-4 lg:ml-12'>Build User Profile</h1>
                <form onSubmit={submitUserProfile} className='profile-form mt-4 flex flex-col'>
                    <label className='text-2xl font-light ml-8 lg:ml-20' htmlFor='name'>Name</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="name" onChange={changeName}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='age'>Age</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="age" onChange={changeAge}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='studyYear'>Study year</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="studyYear" onChange={changeStudyYear}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='profilePic'>Profile picture</label>
                    <input className='ml-8 lg:ml-20' type="file" name="profilePic"/>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' onChange={changeProfilePic}></input>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='department'>Department</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="department" onChange={changeDepartment}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='subject1'>Subject 1</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject1' onChange={changeSubject1}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='subject2'>Subject 2</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject2' onChange={changeSubject2}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='studyingStyle'>Studying style</label>
                    <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='studyingStyle' onChange={changeStudyingStyle}>
                        <option value='Quiet/Individual work'>Quiet/Individual work</option>
                        <option value='Discussion/Group work'>Discussion/Group work</option>
                    </select>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='description'>You understanding level</label>
                    <textarea className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 rounded-sm text-xl pl-2 pt-2' rows='4' name='description' onChange={changeDescription}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='status'>Status</label>
                    <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='status' onChange={changeStatus}>
                        <option value='Look for a long term study partner'>Look for a long term study partner</option>
                        <option value='Look for a study group'>Look for a study group</option>
                        <option value='Look for someone to help with homework'>Look for someone to help with homework</option>
                        <option value='Look for some to review class material with'>Look for some to review class material with</option>
                        <option value='Look for test review partner'>Look for test review partner</option>
                    </select>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='availability'>Availability (describe in words)</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='availability' onChange={changeAvailability}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='location'>Location</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='location' onChange={changeLocation}/>
                    <input className='w-16 h-8 bg-red-500 hover:bg-red-700 rounded-sm ml-8 lg:ml-20 text-white mt-6 mb-4' type='submit' value='Post'/>
                </form>
            </div>
        )
    } else {
        return (
            <Login/>
        )
    }
    
}