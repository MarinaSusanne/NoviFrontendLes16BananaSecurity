import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function SignUp() {
    const {register, formState: {errors}, handleSubmit} = useForm({mode:"onChange"});
    const navigate = useNavigate();
    //STATE hoeft niet meer door React HookForm :)
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleFormSubmit(data) {
        console.log(data);
        toggleLoading(true);
        toggleError(false);
        try {
            const result = await axios.post('http://localhost:3000/register', {
                email: data.email,
                password: data.password,
                username: data.username,
            })
            navigate('/signin');
        } catch (e) {
            console.log(e)
            toggleError(true);

        }
        toggleLoading(false);
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
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
                <button type="submit"> Indienen</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}
    export default SignUp;
