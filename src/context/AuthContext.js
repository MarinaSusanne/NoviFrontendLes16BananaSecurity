import React, {createContext, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import jwtDecode from "jwt-decode";
import fromTokentoDate from "../helpers/fromTokentoDate";

export const AuthContext = createContext({});
//altijd in react eerst state en useEffect en dan de rest
//volgende keer aanpassen toggleIsAuth naar setAuthState, is netter!

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });


    useEffect(() => {
            //is er een token?
            const token = localStorage.getItem('token');
            //als token truthy is (en dus staat er iets in storage) en dus gevuld en token in de functie true is en dus geldig
            if (token && fromTokentoDate(token)) {
                const decodedToken = jwt_decode(token);
                void fetchDataUser(token, decodedToken.sub);
            }
            else {
                toggleIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        },
        []);

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
                },
                status: 'done',
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
            user: null,
            status: 'done',
        });
        console.log('gebruiker is uitgelogd');
        navigate('/');
    };

const data = {
    //mag ook dezelfde naam
    //mag ook met spreadoperator ...isAuth

    isAuth: isAuth.isAuth,
    user:isAuth.user,
    logIn: logIn,
    logOut: logOut,
    banaan:'geel',
    };

    return (
    <AuthContext.Provider value={data}>
        {isAuth.status === 'done' ? children : <p> Loading...</p>}
    </AuthContext.Provider>
    )  ;
}


export default AuthContextProvider

