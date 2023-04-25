import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const context  = useContext(AuthContext);
    console.log(context);
    const [secretData, setSecretData] =useState({});

    useEffect(() => {
            async function fetchProfileData() {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:3000/660/private-content`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    console.log(response);
                    setSecretData(response.data);
                } catch (e) {
                    console.error(e)
                }
            }
            void fetchProfileData();
        }

        ,[]);

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {context.user.username}</p>
        <p><strong>Email:</strong> {context.user.email}</p>
      </section>
      <section>
        <h2>{secretData.title}</h2>
        <p>{secretData.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;