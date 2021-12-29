import React, {useState, useEffect} from "react";
import Login from "./Login";
import UserProfileDetails from "./UserProfileDetails";

export default function HomePage() {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState(0)
    const [userLikeList, setUserLikeList] = useState([])
    
    let userId = window.localStorage.getItem('userId');

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
        
    }
    
    useEffect(() => {
        fetch('/api/profiles')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUserList(data);
            fetch(`/api/like/${userId}`)
            .then(response => response.json())
            .then(likeData => {
                console.log(likeData);
                setUserLikeList(likeData.liked_people);
            })
            .catch((likeError) => {
                console.log(likeError);
            })
        })
        .catch(error => {
            console.log("Error: ", error);
    })}, [])

    const user = userList[currentUser]

    if (user) {
        if (user.userId === userId || userLikeList.includes(user.userId)) {
            setCurrentUser(currentUser + 1);
            console.log('found your own profile')
        } 
        /*
        else {
            let subjectsString = ""
            for (let i=0; i < user.subjects.length; i++) {
                console.log(user.subjects[i]);
                if (i < user.subjects.length - 1) {
                    console.log(user.subjects[i]);
                    subjectsString = subjectsString + String(user.subjects[i]) + ', ';
                    console.log(subjectsString)
                } else {
                    subjectsString = subjectsString + user.subjects[i]
                }
            }
            user.subjects = subjectsString;
        }
        */
    }

    if (userId !== "") {
        if(user) {
            return(
                <UserProfileDetails user={user} owner={false} passFunction={() => setCurrentUser(currentUser+1)} likeFunction={() => {addLike(userId, user.userId)}}/>
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