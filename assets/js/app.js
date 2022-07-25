import React, {useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "./Pages/login";
import Main from "./Pages/main";
import Register from "./Pages/register";
import {AuthContext} from "./context";
import Router from "./components/Router";
import Header from "./components/UI/header/header";
import NavBar from "./components/NavBar";

const App = () => {
    const [user, setUser] = useState(window.user);
    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            <Header/>
            <BrowserRouter>
                <NavBar/>
                <Router/>

            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;