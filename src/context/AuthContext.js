import React, { createContext, useState } from 'react';
import {NavLink, useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function logIn(){
     toggleIsAuth(true);
        console.log('gebruiker is ingelogd');
    }

    function logOut(){
    toggleIsAuth(false);
        console.log('gebruiker is uitgelogd');
        history.push('/');
    }


const data = {
    isAuthenticated: isAuth,
    logInFunction: logIn,
    logOutFunction: logOut,
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

