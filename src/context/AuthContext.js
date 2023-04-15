import React, { createContext, useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

   function logIn(JWT){
        console.log('gebruiker is ingelogd');
        localStorage.setItem('token', JWT);
        const decodedToken = jwt_decode(JWT);
        fetchDataUser(JWT, decodedToken.sub);
    }

    async function fetchDataUser(JWT, id){
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(result);
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                }
            });
            navigate("/profile");

            } catch (e) {
            console.log(e)
        }
    }

    function logOut(){
        localStorage.removeItem('token');
        toggleIsAuth({
            isAuth: false,
            user: null
        });
        console.log('gebruiker is uitgelogd');
        navigate('/');
    }

const data = {
    //mag ook dezelfde naam gebruiken
    isAuth: isAuth.isAuth,
    user:isAuth.user,
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

