import React, { createContext, useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    function logIn(token){
        toggleIsAuth(true);
        console.log('gebruiker is ingelogd');
        localStorage.setItem('token', token);
        navigate('/profile')
    }

    function logOut(){
        toggleIsAuth(false);
        console.log('gebruiker is uitgelogd');
        navigate('/');
    }

const data = {
    //mag ook dezelfde naam gebruiken
    isAuthenticated: isAuth,
    logIn: logIn,
    logOut: logOut,
    banaan:'geel',
}

    return (
    <AuthContext.Provider
        value={data}>
        { children }
      </AuthContext.Provider>
            )
}

export default AuthContextProvider

