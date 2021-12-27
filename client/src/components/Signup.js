import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [notification, setNotification] = useState(false)

    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updatePassword = e => {
        setPassword(e.target.value)
    }

    const updatePassword2 = e => {
        setPassword2(e.target.value)
    }

    let notificationUI;
    if(notification) {
        notificationUI = <p className='mt-4 text-xl text-red-500'>Inappropriate email/password. Please try again.</p>
    }
    
    const signUp = e => {
        e.preventDefault();
        if (password2 === password) {
            let userCredentials = {
                "email": email,
                "password": password
            }
            fetch('/api/signup/users', {
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
                    navigate('/')
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            })
        }       
    }
    
    return (
        <div className="text-center">
            <h1 className='mt-10 text-4xl lg:text-6xl font-medium'>Sign up with StudyBuddy</h1>
            {notificationUI}
            <form className="flex flex-col mt-10" onSubmit={signUp}>
                <input className='border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6 mx-auto' type="text" name="email" placeholder="Email" onChange={updateEmail}></input>
                <input className='border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6 mt-8 mx-auto' type="password" name="password" placeholder="Password" onChange={updatePassword}></input>
                <input className='border border-black w-72 sm:w-96 h-8 lg:h-12 rounded-sm text-xl pl-6 mt-8 mx-auto' type='password' name='password2' placeholder='Retype Password' onChange={updatePassword2}></input>
                <input className='w-24 h-8 lg:w-32 lg:h-12 bg-red-500 text-sm lg:text-xl hover:bg-red-700 rounded-sm text-white mt-6 mb-4 mx-auto' type="submit" value="Register"></input>
            </form>
            <p>Already have an account? Log in <span onClick={() => {navigate("/login")}} className='cursor-pointer'>Here</span></p>
        </div>
    )
}