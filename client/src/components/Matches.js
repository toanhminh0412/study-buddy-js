import React, {useState, useEffect} from "react";
import LikedUserContainer from "./LikedUserContainer";
import Login from "./Login";

export default function Matches() {
    const userId = window.localStorage.getItem('userId');
    const [userMatchList, setUserMatchList] = useState([]);

    useEffect(() => {
        fetch(`/api/match/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.matched_people);
            setUserMatchList(data.matched_people)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    if(userId !== "") {
        return (
            <div>
                <h1 className="text-center mb-12 mt-12 text-6xl sm:text-8xl font-medium">Your matches</h1>
                <div>
                    {userMatchList.map(userId => {
                        return(
                            <LikedUserContainer match={true} userId={userId} key={userId}/>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (<Login/>)
    }   
}