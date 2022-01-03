// import modules
import React, {useState, useEffect} from "react";
import '../css/UserProfile.css';
import Login from "./Login";
import UserProfilePic from "./UserProfilePic";
import UserProfileDetails from "./UserProfileDetails";
import {useNavigate} from 'react-router-dom';
import { GrClose } from "react-icons/gr";


export default function UserProfile() {
    const navigate = useNavigate();

    let [name, setName] = useState("");
    let [age, setAge] = useState(-1);
    let [studyYear, setStudyYear] = useState(-1)
    let [department, setDepartment] = useState("")
    let [subject, setSubject] = useState("")
    let [subjects, setSubjects] = useState([])
    let [studyingStyle, setStudyingStyle] = useState(["Quiet/Individual work"])
    let [description, setDescription] = useState("")
    let [status, setStatus] = useState("Look for a long term study partner")
    let [availability, setAvailability] = useState("")
    let [location, setLocation] = useState("")
    
    useEffect(() => {
        if (window.localStorage.getItem('name') !== "") {
            setName(window.localStorage.getItem('name'));
            setAge(parseInt(window.localStorage.getItem('age')));
            setStudyYear(parseInt(window.localStorage.getItem('studyYear')))
            setDepartment(window.localStorage.getItem('department'))
            setSubjects(window.localStorage.getItem('subjects').split(','))
            setStudyingStyle(window.localStorage.getItem('studyingStyle').split(' '));
            setDescription(window.localStorage.getItem('description'));
            setStatus(window.localStorage.getItem('status'));
            setAvailability(window.localStorage.getItem('availability'));
            setLocation(window.localStorage.getItem('location'));
        }
    }, [])


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

    let changeDepartment = e => {
        setDepartment(e.target.value)
    }

    let changeSubject = e => {
        setSubject(e.target.value)
    }

    const addSubject = () => {
        if (subject !== "") {
            setSubjects([...subjects, subject]);
            setSubject("")
        }  
    }

    const deleteSubject = (delSubject) => {
        setSubjects(subjects.filter(subject => subject !== delSubject))
    }

    /*
    let changeSubject1 = e => {
        setSubjects([e.target.value, subjects[1]])
    }

    let changeSubject2 = e => {
        setSubjects([subjects[0], e.target.value])
    }
    */

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
            "userId": window.localStorage.getItem('userId'),
            "name": name,
            "age": age,
            "profilePic": window.localStorage.getItem('profilePic'),
            "studyYear": studyYear,
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
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('age', age)
            window.localStorage.setItem('studyYear', studyYear)
            window.localStorage.setItem('department', department)
            window.localStorage.setItem('subjects', subjects)
            window.localStorage.setItem('studyingStyle', studyingStyle)
            window.localStorage.setItem('description', description)
            window.localStorage.setItem('status', status)
            window.localStorage.setItem('availability', availability)
            window.localStorage.setItem('location', location)
            window.localStorage.setItem('editPic', "false");
            window.localStorage.setItem('editDetails', "false");
            navigate('/user-profile')
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    let userId = window.localStorage.getItem('userId');
    let userName = window.localStorage.getItem('name')
    let editPic = window.localStorage.getItem('editPic');
    let editDetails = window.localStorage.getItem('editDetails');

    if (userId !== "") {
        if(userName){
            if(editPic === "true") {
                return(<UserProfilePic />)
            }
            const userProfilePic = window.localStorage.getItem('profilePic');
            const userAge = window.localStorage.getItem('age');
            const userStudyYear = window.localStorage.getItem('studyYear');
            const userDepartment = window.localStorage.getItem('department')
            const userStatus = window.localStorage.getItem('status');
            const userSubjects = window.localStorage.getItem('subjects')
            const userStudyingStyle = window.localStorage.getItem('studyingStyle')
            const userDescription = window.localStorage.getItem('description')
            const userAvailability = window.localStorage.getItem('availability')
            const userLocation = window.localStorage.getItem('location')
            const user = {
                name: userName,
                age: userAge,
                studyYear: userStudyYear,
                department: userDepartment,
                profilePic: userProfilePic,
                status: userStatus,
                subjects: userSubjects,
                studyingStyle: userStudyingStyle,
                description: userDescription,
                availability: userAvailability,
                location: userLocation
            }

            if (editDetails === "true") {
                return (
                <div>
                    <h1 className='font-medium text-5xl mt-8 sm:ml-4 lg:ml-12'>Build User Profile</h1>
                    <form onSubmit={submitUserProfile} className='profile-form mt-4 flex flex-col'>
                        <label className='text-2xl font-light ml-8 lg:ml-20' htmlFor='name'>Name</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="name" value={name} onChange={changeName}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='age'>Age</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="age" value={age} onChange={changeAge}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='studyYear'>Study year</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="number" name="studyYear" value={studyYear} onChange={changeStudyYear}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='department'>Department</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="department" value={department} onChange={changeDepartment}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='subject1'>Subjects</label>
                        <div className='flex flex-row'>
                        <input className='ml-8 lg:ml-20 border border-black w-52 sm:w-80 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject1' value={subject} onChange={changeSubject}/>
                        <div onClick={addSubject} className='bg-red-500 hover:bg-red-900 duration-200 cursor-pointer w-20 text-center flex flex-col justify-center border border-l-0 border-black rounded-sm'>
                            <p className='text-white text-xl'>Add</p>
                        </div>
                        </div>
                        <div className='ml-8 lg:ml-20 flex flex-row flex-wrap mt-2 mb-2'>
                        {
                        subjects.map(curSubject => {            
                            return (<div className='shadow-md rounded-md h-10 w-fit text-center pt-2 mr-1 flex flex-row pr-2' key={curSubject}>
                                          <p className='text-lg ml-3 mr-2'>{curSubject}</p>
                                          <GrClose className="mt-1" onClick={() => {deleteSubject(curSubject)}}/>
                                    </div>)
                        })}
                        </div>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='studyingStyle'>Studying style</label>
                        <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='studyingStyle' value={studyingStyle[0]} onChange={changeStudyingStyle}>
                            <option value='Quiet/Individual work'>Quiet/Individual work</option>
                            <option value='Discussion/Group work'>Discussion/Group work</option>
                        </select>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='description'>You understanding level</label>
                        <textarea className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 rounded-sm text-xl pl-2 pt-2' rows='4' name='description' value={description} onChange={changeDescription}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='status'>Status</label>
                        <select className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' name='status' value={status} onChange={changeStatus}>
                            <option value='Look for a long term study partner'>Look for a long term study partner</option>
                            <option value='Look for a study group'>Look for a study group</option>
                            <option value='Look for someone to help with homework'>Look for someone to help with homework</option>
                            <option value='Look for some to review class material with'>Look for some to review class material with</option>
                            <option value='Look for test review partner'>Look for test review partner</option>
                        </select>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='availability'>Availability (describe in words)</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='availability' value={availability} onChange={changeAvailability}/>
                        <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='location'>Location</label>
                        <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='location' value={location} onChange={changeLocation}/>
                        <input className='w-16 h-8 bg-red-500 hover:bg-red-700 rounded-sm ml-8 lg:ml-20 text-white mt-6 mb-4' type='submit' value='Post'/>
                    </form>
                </div>
                )
            }
            return (
                <UserProfileDetails user={user} owner={true}/>
            )
        } else {
        let profilePic = window.localStorage.getItem('profilePic');
        if (!profilePic) {
            return (
                <UserProfilePic/>
            )
        } else {
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
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='department'>Department</label>
                    <input className='ml-8 lg:ml-20 border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6' type="text" name="department" onChange={changeDepartment}/>
                    <label className='text-2xl font-light ml-8 lg:ml-20 mt-2' htmlFor='subject1'>Subjects</label>
                    <div className='flex flex-row'>
                    <input className='ml-8 lg:ml-20 border border-black w-52 sm:w-80 h-8 lg:h-12 rounded-sm text-xl pl-6' type='text' name='subject1' value={subject} onChange={changeSubject}/>
                    <div onClick={addSubject} className='bg-red-500 hover:bg-red-900 duration-200 cursor-pointer w-20 text-center flex flex-col justify-center border border-l-0 border-black rounded-sm'>
                        <p className='text-white text-xl'>Add</p>
                    </div>
                    </div>
                    <div className='ml-8 lg:ml-20 flex flex-row flex-wrap mt-2 mb-2'>
                        {
                        subjects.map(curSubject => {            
                            return (<div className='shadow-md rounded-md h-10 w-fit text-center pt-2 mr-1 flex flex-row pr-2' key={curSubject}>
                                          <p className='text-lg ml-3 mr-2'>{curSubject}</p>
                                          <GrClose className="mt-1" onClick={() => {deleteSubject(curSubject)}}/>
                                    </div>)
                        })}
                    </div>
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
        }
    }
    } else {
        return (
            <Login/>
        )
    }
    
}