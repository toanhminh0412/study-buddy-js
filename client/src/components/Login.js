import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import HomePage from './HomePage';

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [notification, setNotification] = useState(false)

    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updatePassword = e => {
        setPassword(e.target.value)
    }

    let notificationUI;
    if (notification) {
        notificationUI = <p className='mt-4 text-xl text-red-500'>Invalid credentials. Please try again.</p>
    }

    const loginWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            let userId = result.user.uid;
            if (userId) {
                window.localStorage.setItem('userId', userId)
                fetch(`/api/profiles/${userId}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.userProfile) {
                        let userProfile = data.userProfile
                        window.localStorage.setItem('name', userProfile.name)
                        window.localStorage.setItem('age', userProfile.age)
                        window.localStorage.setItem('studyYear', userProfile.studyYear)
                        window.localStorage.setItem('profilePic', userProfile.profilePic)
                        window.localStorage.setItem('department', userProfile.department)
                        let subjectsString = ""
                        for (let i=0; i<userProfile.subjects.length; i++) {
                            if (i < userProfile.subjects.length - 1) {
                                subjectsString = subjectsString + userProfile.subjects[i] + ', ';
                            } else {
                                subjectsString = subjectsString + userProfile.subjects[i]
                            }
                        }
                        window.localStorage.setItem('subjects', subjectsString);
                        window.localStorage.setItem('studyingStyle', userProfile.studyingStyle)
                        window.localStorage.setItem('description', userProfile.description)
                        window.localStorage.setItem('status', userProfile.status)
                        window.localStorage.setItem('availability', userProfile.availability)
                        window.localStorage.setItem('location', userProfile.location)
                        window.localStorage.setItem('locationGeo', userProfile.locationGeo[0] + "," + userProfile.locationGeo[1]);
                        window.localStorage.setItem('editPic', "false");
                        window.localStorage.setItem("editDetails", "false");
                    }
                    navigate('/user-profile')
                })
                .catch((error) => {
                    console.log('Error:', error);
                })
                
            }
        })
        .catch(error => {
            console.log("Couldn't sign in with Google")
        })
    }
    
    const logIn = e => {
        e.preventDefault();
        let userCredentials = {
            "email": email,
            "password": password
        }
        fetch('/api/login/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        })
        .then(response => {
            if (response.status >= 400) {
                setNotification(true);
            } else {
                return response.json();
            }
        })
        .then(data => {
            let userId = data.userId;
            if (userId) {
                window.localStorage.setItem('userId', userId)
                fetch(`/api/profiles/${userId}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.userProfile) {
                        let userProfile = data.userProfile
                        window.localStorage.setItem('name', userProfile.name)
                        window.localStorage.setItem('age', userProfile.age)
                        window.localStorage.setItem('studyYear', userProfile.studyYear)
                        window.localStorage.setItem('profilePic', userProfile.profilePic)
                        window.localStorage.setItem('department', userProfile.department)
                        let subjectsString = ""
                        for (let i=0; i<userProfile.subjects.length; i++) {
                            if (i < userProfile.subjects.length - 1) {
                                subjectsString = subjectsString + userProfile.subjects[i] + ', ';
                            } else {
                                subjectsString = subjectsString + userProfile.subjects[i]
                            }
                        }
                        window.localStorage.setItem('subjects', subjectsString);
                        window.localStorage.setItem('studyingStyle', userProfile.studyingStyle)
                        window.localStorage.setItem('description', userProfile.description)
                        window.localStorage.setItem('status', userProfile.status)
                        window.localStorage.setItem('availability', userProfile.availability)
                        window.localStorage.setItem('location', userProfile.location)
                        window.localStorage.setItem('locationGeo', userProfile.locationGeo[0] + "," + userProfile.locationGeo[1]);
                        window.localStorage.setItem('editPic', "false");
                        window.localStorage.setItem("editDetails", "false");
                    }
                    navigate('/user-profile')
                })
                .catch((error) => {
                    console.log('Error:', error);
                })
                
            }
        })
        .catch((error) => {
            console.log('Error:', error);
            // setNotification(true)
        })
    }

    const userId = window.localStorage.getItem('userId')
    if (userId) {
        return (<HomePage/>);
    }
    
    return (
        <div className="text-center">
            <h1 className='mt-10 text-4xl lg:text-6xl font-medium'>Login with StudyBuddy</h1>
            {notificationUI}
            <form className="flex flex-col mt-10" onSubmit={logIn}>
                <input className='border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6 mx-auto' type="text" name="email" placeholder="Email" onChange={updateEmail}></input>
                <input className='border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6 mt-8 mx-auto' type="password" name="password" placeholder="Password" onChange={updatePassword}></input>
                <input className='w-16 h-8 lg:w-24 lg:h-12 bg-red-500 text-sm lg:text-xl hover:bg-red-700 rounded-sm text-white mt-6 mb-4 mx-auto' type="submit" value="Login"></input>
            </form>
            <p>Do not have an account? Sign up <span onClick={() => {navigate('/signup')}}className='cursor-pointer font-medium'>Here</span></p>
            <p className='mt-2'>Forgot password? Click <span className='font-medium'>here</span> to reset your password</p>
            <div onClick={loginWithGoogle} className="mt-8 mx-auto bg-blue-600 hover:bg-blue-800 w-72 sm:w-96 h-10 lg:h-16 rounded-sm pl-2 flex flex-row cursor-pointer">
                <div className='ml-6 my-auto w-12 h-12 bg-white'>
                    <img className="w-12 h-12" src="img/google-logo.png" alt="Google logo"></img>
                </div>
                <p className='text-white text-2xl font-medium my-auto ml-6'>Continue with Google</p>
            </div>
        </div>
    )
}