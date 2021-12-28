// import modules
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import files
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserProfile from './components/UserProfile';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Message from "./components/Message";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Q5uJDm7DM0q2WIFkPmyj0wjlqdkWPgc",
  authDomain: "study-buddy-63dfc.firebaseapp.com",
  projectId: "study-buddy-63dfc",
  storageBucket: "study-buddy-63dfc.appspot.com",
  messagingSenderId: "507104695623",
  appId: "1:507104695623:web:d45fec11754265c0816862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route element={<HomePage/>} path="/" exact></Route>
        <Route element={<Signup/>} path="/signup"></Route>
        <Route element={<Login/>} path="/login"></Route>
        <Route element={<UserProfile/>} path="/user-profile"></Route>
        <Route element={<Message/>} path="/message"></Route>
      </Routes>
    </Router>
  );
}

export default App;