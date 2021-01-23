import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';
import { signup } from '../../store/session';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if (password === confPassword) {
            return dispatch(signup({ username, email, password }))
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors)
                })
        } else {
            setErrors(['Passwords do not match'])
        }

    }

    return (
        <>
            <form className="form__signup" onSubmit={onSubmit}>
                <h3>Sign Up</h3>
                    <ul className="error-list">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                <div className="form__input-container">
                    <label className="form__input-container--label">Username</label>
                    <input 
                    required 
                    className="form__input-container--text" 
                    type="text" value={username} 
                    onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form__input-container">
                    <label className="form__input-container--label">Email</label>
                    <input 
                    required 
                    className="form__input-container--text" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form__input-container">
                    <label className="form__input-container--label">Password</label>
                    <input 
                    required 
                    className="form__input-container--text" 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form__input-container">
                    <label className="form__input-container--label">Confirm Password</label>
                    <input 
                    required 
                    className="form__input-container--text" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form__button">
                    <button className="form__button" type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
};

export default SignupForm;