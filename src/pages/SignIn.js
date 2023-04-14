import React from 'react';
import  {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";


function SignIn() {
    //dit mag uiteraard korter, namelijk const {login } =useContext, maar de nu even zo
    const whatsInTheContext  = useContext(AuthContext);
    console.log(whatsInTheContext);
    const {register, formState: {errors}, handleSubmit} = useForm({mode:"onChange"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

   async function handleFormSubmit(data) {
       console.log(data);
       toggleLoading(true);
       try {
           const result = await axios.post('http://localhost:3000/login', {
               email: data.email,
               password: data.password,
           })
           console.log(result);
           const token = result.data.accessToken;
           whatsInTheContext.logIn(token);
           navigate('/profile');
       } catch (e) {
           console.log(e)
           toggleError(true);

       }
       toggleLoading(false);
   }


  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label htmlFor="username-field">
              Email:
              <input
                  type="text"
                  id="email-field"
                  {...register("email", {
                          required: {
                              value: true,
                              message: 'Dit veld is verplicht',
                          },
                          validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                      }
                  )}
              />
              {errors.email && <p>{errors.email.message}</p>}
          </label>

          <label htmlFor="password-field">
              Wachtwoord:
              <input
                  type="text"
                  id="password-field"
                  {...register("password", {
                      required: "Dit veld is verplicht",
                      minlength: {
                          value: 10,
                          message: "Minstens 10 karakters"
                      },
                      maxLength: 50,
                  })}
              />
              {errors.password && <p>{errors.password.message}</p>}
          </label>
        <button type="submit"> Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;
