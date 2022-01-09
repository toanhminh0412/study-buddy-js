import React, {useState, useEffect} from "react";
import LikedUserContainer from "./LikedUserContainer";
import {collection, getDoc, getDocs, query, where, doc} from 'firebase/firestore';
import {db} from '../App';
import Login from "./Login";
import HelpButton from "./HelpButton";

export default function Likes() {
    const [userLikeList, setUserLikeList] = useState([])
    const currentuserId = window.localStorage.getItem("userId");
    
    const getLikeList = async () => {
        const matchSnapshot = await getDoc(doc(db, "matches", window.localStorage.getItem('userId')));
        let matched_users = []
        if (matchSnapshot.exists()) {
            matched_users = matchSnapshot.data().matched_people;
        }
        
        
        const q2 = query(collection(db, 'likes'), where("liked_people", "array-contains", window.localStorage.getItem('userId')))
        const querySnapshot = await getDocs(q2);
        let users = []
        querySnapshot.forEach(doc => {
            if (!matched_users.includes(doc.data().user)) {
                users.push(doc.data().user)
            }
        })
        setUserLikeList(users);
    }

    useEffect (() => {
        if(currentuserId !== "") {
            getLikeList();
        }
    }, [])

    if(currentuserId !== "" || currentuserId === null) {
        return (
            <div>
                <HelpButton userLikes={true}/>
                <h1 className="text-center mb-12 mt-12 text-6xl sm:text-8xl font-medium">Who like you</h1>
                <div>
                    {userLikeList.map(userId => {
                        return(
                            <LikedUserContainer match={false} userId={userId} key={userId}/>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <Login />
    }
    
}