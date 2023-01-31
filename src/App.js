// import LoginSignup from "./LoginSignup/LoginSignup";
// import UserAccount from "./UserAccount/UserAccount";
import "./styles.scss";
import { useState, createContext } from "react";
import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import {BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./Navbar/Navbar";
import Preferences from "./UserAccount/Preferences";
import Profile from "./UserAccount/Profile";
import React from "react";

export const UserLoginContext = createContext();

export default function App() {
  // const [isRegistered,setIsRegistered]=useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <UserLoginContext.Provider value={setIsLoggedIn}>
      <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route exact path="/" element={<SignIn/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/User">   
          <Route path="/User/Profile" element={<Profile/>}/>
          <Route path="/User/Preferences" element={<Preferences/>}/>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </UserLoginContext.Provider>
  );
}
