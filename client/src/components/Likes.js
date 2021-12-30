import React from "react";
import LikedUserContainer from "./LikedUserContainer";

export default function Likes() {
    const userLikeList = JSON.parse(window.localStorage.getItem("liked_people"));

    return (
        <div>
            <h1 className="text-center mb-12 mt-12 text-6xl sm:text-8xl font-medium">You have liked</h1>
            <div>
                {userLikeList.map(userId => {
                    return(
                        <LikedUserContainer match={false} userId={userId} key={userId}/>
                    )
                })}
            </div>
        </div>
    )
}