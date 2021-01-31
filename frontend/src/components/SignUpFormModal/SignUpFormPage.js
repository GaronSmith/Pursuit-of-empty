import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';
import { signup } from '../../store/session';
import { addUser } from '../../store/preferences';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/dashboard" />;

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if (password === confirmPassword) {
            return dispatch(signup({ username, firstName, lastName, email, password }))
                .then((res) => dispatch(addUser(res.data.user.id)))
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
                <div className='form__content-container'>
                    <h3 className='form__title'>Sign Up</h3>
                    <ul className="error-list">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="text" value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='username'
                        />
                    </div>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="text" value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder='First Name'
                        />
                    </div>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="text" value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder='Last Name'
                        />
                    </div>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='email'
                        />
                    </div>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='password'
                        />
                    </div>
                    <div className="form__input-container">
                        <input
                            required
                            className="form__input-container--text"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='confirm password'
                        />
                    </div>
                    <div className="form__button">
                        <button className="form__button-button" type="submit">Sign Up</button>
                    </div>
                </div>

            </form>
        </>
    );
};

export default SignupForm;