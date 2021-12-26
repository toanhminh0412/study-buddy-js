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