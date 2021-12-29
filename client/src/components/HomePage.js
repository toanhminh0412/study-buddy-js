import React, {useState, useEffect} from "react";
import Login from "./Login";
import UserProfileDetails from "./UserProfileDetails";

export default function HomePage() {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState(0)
    
    let userId = window.localStorage.getItem('userId');

    
    useEffect(() => {
        fetch('/api/profiles')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUserList(data);
        })
        .catch(error => {
            console.log("Error: ", error);
    })}, [])

    const user = userList[currentUser]
    if (user) {
        if (user.userId === userId) {
            setCurrentUser(currentUser + 1);
            console.log('found your own profile')
        }
    }

    if (userId !== "") {
        if(user) {
            return(
                <UserProfileDetails user={user} owner={false} passFunction={() => setCurrentUser(currentUser+1)}/>
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
                        <h1 className="text-center text-6xl mb-20">No more available user</h1>
                    </div>
                )
            }
        }
    } else {
        return <Login/>
    }
}