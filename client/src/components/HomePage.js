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
    const [locationPref, setLocationPref] = useState(1000);
    const [userListPref, setUserListPref] = useState([]);
    const [pref, setPref] = useState(false);

    let userId = window.localStorage.getItem('userId');

    const showPref = e => {
        e.preventDefault();
        setPref(true);
        let users = []
        userList.forEach(user => {
            if((user.department.replace(/ /g, "").toLowerCase().includes(departmentPref.replace(/ /g, "").toLowerCase()) && departmentPref !== "") || departmentPref === "") {
                if((yearPref !== 0 && user.studyYear === yearPref) || yearPref === 0) {
                    let matchSubject = false;
                    user.subjects.forEach(subject => {
                        if (subject.replace(/ /g, "").toLowerCase() === subjectPref.replace(/ /g, "").toLowerCase()) {
                            matchSubject = true
                        }
                    })
                    if((subjectPref !== '' && matchSubject) || subjectPref === "") {
                        if((stylePref !== 'any' && user.studyingStyle.includes(stylePref)) || stylePref === "any") {
                            let locationGeo = window.localStorage.getItem('locationGeo').split(',');
                            let distance = getDistanceFromLatLonInKm(parseFloat(locationGeo[0]), parseFloat(locationGeo[1]), user.locationGeo[0], user.locationGeo[1])
                            if ((distance <= locationPref) || locationPref === 1000) {
                                users.push(user);
                            }
                        }
                    }
                }
            }
        })
        setSubjectPref('');
        setUserListPref(users);
        setCurrentUser(0);
    }

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
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
        setLocationPref(parseInt(e.target.value));
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
            })
            .catch((likeError) => {
                console.log(likeError);
            })
        })
        .catch(error => {
            console.log("Error: ", error);
    })}, [likeTimes])

    let user;
    if (pref) {
        user = userListPref[currentUser];
    } else {
        user = userList[currentUser];
    }
    
    

    if (user) {
        if (user.userId === userId || userLikeList.includes(user.userId)) {
            setCurrentUser(currentUser + 1);
        } 
    }

    if (userId !== "") {
        let userName = window.localStorage.getItem('name');
        if (userName === "") {
            return (
                <div className='w-screen h-screen flex flex-col justify-center'>
                    <h1 className="text-center text-6xl mb-20">Build an user profile and come back</h1>
                </div>
            )
        }
        if(user) {
            return(
                <div>
                    {!prefOpen ? 
                    (<div className='absolute top-14 lg:top-20 left-2 lg:left-4 bg-white rounded-full w-12 h-12 flex flex-col justify-center hover:bg-slate-200 duration-200 z-10' onClick={togglePreference}>
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
                            <label className='lg:text-xl' htmlFor='studyingStyle-pref'>Location</label>
                            <select className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl' name='studyingStyle-pref' onChange={updateLocationPref} defaultValue='1000'>
                                <option value='5'>Around 5 km</option>
                                <option value='10'>Around 10 km</option>
                                <option value='15'>Around 15 km</option>
                                <option value='1000'>Any</option>
                            </select>
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
                            <label className='lg:text-xl' htmlFor='studyingStyle-pref'>Location</label>
                            <select className='mb-2 lg:mb-4 border border-slate-500 lg:h-8 lg:text-xl' name='studyingStyle-pref' onChange={updateLocationPref} defaultValue='1000'>
                                <option value='5'>Around 5 km</option>
                                <option value='10'>Around 10 km</option>
                                <option value='15'>Around 15 km</option>
                                <option value='1000'>Any</option>
                            </select>
                            <div className='w-fit ml-auto mt-2 flex flex-row'>
                                <div className='w-20 bg-orange-500 rouded-sm text-white text-center mr-4 hover:bg-orange-700 duration-200' onClick={togglePreference}>Close</div>
                                <input className='w-20 bg-red-500 rouded-sm text-white hover:bg-red-700 duration-200' type='submit' value='Apply'/>
                            </div>
                        </form>
                    </div>)}
                        <h1 className="text-center text-6xl mb-20">No more available user</h1>
                    </div>
                )
            // }
        }
    } else {
        return <Login/>
    }
}