import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './LoginForm.css';
import * as sessionActions from "../../store/session";

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to='/' />

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            (res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            }
        );
    };

    return (
      
        <form className='form__login' onSubmit={onSubmit}>
            <div className='form__content-container'>
                <h3 className='form__title'>User Login</h3>
                <div className="form__error-container">
                    <ul className='error-list'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
                <div className="form__input-container">
                    <input
                        type="text"
                        value={credential}
                        className="form__input-container--text"
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='username/email'
                        required
                    />

                </div>
                <div className="form__input-container">
                    <input className='no-transition'
                        type="password"
                        value={password}
                        className="form__input-container--text"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        required
                    />

                </div>
                <div className="form__button">
                    <button className="form__button-button" type="submit">Login</button>
                </div>

            </div>
           
        </form>
   
        
    );
}

export default LoginForm;