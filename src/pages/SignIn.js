import React from 'react';
import  {useContext} from "react";
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";

function SignIn() {
    const whatsInTheContext  = useContext(AuthContext);
    console.log(whatsInTheContext);
    const {register, formState: {errors}, handleSubmit} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label htmlFor="username-field">
              Naam:
              <input
                  type="text"
                  id="username-field"
                  {...register("username")}
              />
              {errors.username && <p>{errors.username.message}</p>}
          </label>

          <label htmlFor="email-field">
              Email:
              <input
                  type="text"
                  id="email-field"
                  {...register("email", {
                      required: true,
                      validate: (value) => value.includes('@'),
                  })}
              />
              {errors.email && <p>{errors.email.message}</p>}
          </label>
        <button type="submit" onClick={whatsInTheContext.logInFunction}> Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;