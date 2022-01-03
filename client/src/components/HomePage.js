import React, {useState, useEffect} from "react";
import Login from "./Login";
import UserProfileDetails from "./UserProfileDetails";
import {IoIosSettings} from 'react-icons/io';

export default function HomePage() {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState(0)
    const [userLikeList, setUserLikeList] = useState([])
    const [likeTimes, setLikeTimes] = useState(0)
    const [prefOpen, setPrefOpen] = useState(false)
    const [departmentPref, setDepartmentPref] = useState('');
    const [yearPref, setYearPref] = useState(0);
    const [subjectPref, setSubjectPref] = useState('');
    const [stylePref, setStylePref] = useState('any');
    const [locationPref, setLocationPref] = useState('');
    const [userListPref, setUserListPref] = useState([]);

    let userId = window.localStorage.getItem('userId');

    const showPref = e => {
        e.preventDefault();
        let users = []
        userList.forEach(user => {
            if((user.department.replace(/ /g, "").toLowerCase().includes(departmentPref.replace(/ /g, "").toLowerCase()) && departmentPref !== "") || departmentPref === "") {
                if((yearPref !== 0 && user.studyYear === yearPref) || yearPref === 0) {
                    if((subjectPref !== '' && user.subjects.includes(subjectPref)) || subjectPref === "") {
                        if((stylePref !== 'any' && user.studyingStyle.includes(stylePref)) || stylePref === "any") {
                            if ((locationPref !== '' && user.location === locationPref) || locationPref === "") {
                                users.push(user);
                            }
                        }
                    }
                }
            }
        })
        setUserListPref(users);
        setCurrentUser(0);
    }

    const togglePreference = () => {
        if(prefOpen) {
            setPrefOpen(false);
        } else {
            setPrefOpen(true);
        }
    }

    const updateDepartmentPref = e => {
        setDepartmentPref(e.target.value);
    }

    const updateYearPref = e => {
        setYearPref(e.target.value);
    }

    const updateSubjectPref = e => {
        setSubjectPref(e.target.value);
    }

    const updateStylePref = e => {
        setStylePref(e.target.value);
    }

    const updateLocationPref = e => {
        setLocationPref(e.target.value);
    }

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
            console.log(data)
            setCurrentUser(currentUser+1);
        })
        .catch((error) => {
            console.log(error);
        })
        setLikeTimes(likeTimes+1)
    }
    
    useEffect(() => {
        fetch('/api/profiles')
        .then(response => response.json())
        .then(data => {
            setUserList(data);
            fetch(`/api/like/${userId}`)
            .then(response => response.json())
            .then(likeData => {
                setUserLikeList(likeData.liked_people);
                // window.localStorage.setItem('liked_people', JSON.stringify(likeData.liked_people))
            })
            .catch((likeError) => {
                console.log(likeError);
            })
        })
        .catch(error => {
            console.log("Error: ", error);
    })}, [likeTimes])

    let user = {};
    if (userListPref.length === 0) {
        user = userList[currentUser]
    } else {
        user = userListPref[currentUser];
    }
    

    if (user) {
        if (user.userId === userId || userLikeList.includes(user.userId)) {
            setCurrentUser(currentUser + 1);
        } 
    }

    if (userId !== "") {
        if(user) {
            return(
                <div>
                    {!prefOpen ? 
                    (<div className='absolute top-14 lg:top-20 left-2 lg:left-4 bg-white rounded-full w-12 h-12 flex flex-col justify-center hover:bg-slate-200 duration-200' onClick={togglePreference}>
                        <IoIosSettings className='text-4xl mx-auto'/>
                    </div>) :
                    (<div className='lg:w-72 absolute top-12 left-0 lg:top-20 bg-white rounded-sm shadow-md'>
                        <form className='flex flex-col p-2' onSubmit={showPref}>
                            <label className='lg:text-xl' htmlFor='department-pref'>Department</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='department-pref' onChange={updateDepartmentPref}/>
                            <label className='lg:text-xl' htmlFor='studyYear-pref'>Study year</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='number' name='studyYear-pref' onChange={updateYearPref}/>
                            <label className='lg:text-xl' type='text' name='subject-pref'>Subject</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='subject-pref' onChange={updateSubjectPref}/>
                            <label className='lg:text-xl' htmlFor='studyingStyle-pref'>Style</label>
                            <select className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl' name='studyingStyle-pref' onChange={updateStylePref} defaultValue='any'>
                                <option value='any'>Any</option>
                                <option value='Quiet/Individual work'>Quiet/Individual work</option>
                                <option value='Discussion/Group work'>Discussion/Group work</option>
                            </select>
                            <label className='lg:text-xl' type='location-pref'>Location</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='location-pref' onChange={updateLocationPref}/>
                            <div className='w-fit ml-auto mt-2 flex flex-row'>
                                <div className='w-20 bg-orange-500 rouded-sm text-white text-center mr-4 hover:bg-orange-700 duration-200' onClick={togglePreference}>Close</div>
                                <input className='w-20 bg-red-500 rouded-sm text-white hover:bg-red-700 duration-200' type='submit' value='Apply'/>
                            </div>
                        </form>
                    </div>)}
                    
                    <UserProfileDetails user={user} owner={false} passFunction={() => setCurrentUser(currentUser+1)} likeFunction={() => {addLike(userId, user.userId)}}/>
                </div>
            )
        } else {
            if (currentUser === 0) {
                return (
                    <div className='w-screen h-screen flex flex-col justify-center'>
                        <h1 className="text-center text-6xl mb-20">Loading...</h1>
                    </div>
                )
            } else {
                return (
                    <div className='w-screen h-screen flex flex-col justify-center'>
                        {!prefOpen ? 
                    (<div className='absolute top-14 lg:top-20 left-2 lg:left-4 bg-white rounded-full w-12 h-12 flex flex-col justify-center hover:bg-slate-200 duration-200' onClick={togglePreference}>
                        <IoIosSettings className='text-4xl mx-auto'/>
                    </div>) :
                    (<div className='lg:w-72 absolute top-12 left-0 lg:top-20 bg-white rounded-sm shadow-md'>
                        <form className='flex flex-col p-2' onSubmit={showPref}>
                            <label className='lg:text-xl' htmlFor='department-pref'>Department</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='department-pref' onChange={updateDepartmentPref}/>
                            <label className='lg:text-xl' htmlFor='studyYear-pref'>Study year</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='number' name='studyYear-pref' onChange={updateYearPref}/>
                            <label className='lg:text-xl' type='text' name='subject-pref'>Subject</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='subject-pref' onChange={updateSubjectPref}/>
                            <label className='lg:text-xl' htmlFor='studyingStyle-pref'>Style</label>
                            <select className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl' name='studyingStyle-pref' onChange={updateStylePref} defaultValue='any'>
                                <option value='any'>Any</option>
                                <option value='Quiet/Individual work'>Quiet/Individual work</option>
                                <option value='Discussion/Group work'>Discussion/Group work</option>
                            </select>
                            <label className='lg:text-xl' type='location-pref'>Location</label>
                            <input className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl lg:p-2' type='text' name='location-pref' onChange={updateLocationPref}/>
                            <div className='w-fit ml-auto mt-2 flex flex-row'>
                                <div className='w-20 bg-orange-500 rouded-sm text-white text-center mr-4 hover:bg-orange-700 duration-200' onClick={togglePreference}>Close</div>
                                <input className='w-20 bg-red-500 rouded-sm text-white hover:bg-red-700 duration-200' type='submit' value='Apply'/>
                            </div>
                        </form>
                    </div>)}
                        <h1 className="text-center text-6xl mb-20">No more available user</h1>
                    </div>
                )
            }
        }
    } else {
        return <Login/>
    }
}