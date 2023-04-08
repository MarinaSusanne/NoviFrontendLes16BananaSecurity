import React from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";


function SignUp() {
    const {register, formState: {errors}, handleSubmit} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label htmlFor="username-field">
              Naam:
              <input
                  type="text"
                  id="username-field"
                  {...register("username", {
                      required: {
                      value: true,
                      message: 'Dit veld is verplicht',
                  }
                  })
                  }
              />
              {errors.username && <p>{errors.username.message}</p>}
          </label>

          <label htmlFor="email-field">
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
                  {...register("password", { required: true,
                      minlength: 10,
                      maxLength: 50,})}
              />
              {errors.password && <p>{errors.password.message}</p>}
          </label>
            <button type="submit"> Indienen </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;