import React from "react";
import Login from "./Login";

export default function HomePage() {
    let userId = window.localStorage.getItem('userId');
    if (userId !== "") {
        return (
            <h1>HomePage</h1>
        )
    } else {
        return <Login/>
    }
}