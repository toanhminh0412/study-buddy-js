// import modules
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import files
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserProfile from './components/UserProfile';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route element={<HomePage/>} path="/" exact></Route>
        <Route element={<UserProfile/>} path="/user-profile"></Route>
      </Routes>
    </Router>
  );
}

export default App;