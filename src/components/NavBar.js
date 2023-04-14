import React, {useContext, useState} from 'react';
import logo from '../assets/banana-01.png';
import {useHistory, Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";


function NavBar() {
  const navigate = useNavigate();
  const whatsInTheContext = useContext(AuthContext);
  console.log(whatsInTheContext);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        {whatsInTheContext.isAuth  ?
          <button
          type="button"
          onClick={(whatsInTheContext.logOutFunction)}
          >
          Log out
          </button>
          :
            <>
          <button
          type="button"
          onClick={() => navigate('/signin')}
          >
          Log in
          </button>
          <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>
            </>
        }
      </div>
    </nav>
  );
}

export default NavBar;