import React, {useState, useEffect} from "react";
import HelpButton from "./HelpButton";
import LikedUserContainer from "./LikedUserContainer";
import Login from "./Login";

export default function Matches() {
    const userId = window.localStorage.getItem('userId');
    const [userMatchList, setUserMatchList] = useState([]);

    useEffect(() => {
        if (userId) {
            fetch(`/api/match/${userId}`)
        .then(response => response.json())
        .then(data => {
            setUserMatchList(data.matched_people)
        })
        .catch(error => {
            console.log(error);
        })
        }
    }, [])

    if(userId !== "" && userId !== null) {
        return (
            <div>
                <HelpButton userMatches={true}/>
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