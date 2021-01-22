import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { signup } from "../../store/session"

const SignUpFormPage = () => {
    const dispatch = useDispatch()
    
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [errors, setErrors] = useState([])

    if(sessionUser) return <Redirect to='/' />
    
    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if(password === confPassword){
            return dispatch(signup({ username, email, password }))
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors)
                })
        } else {
            setErrors(['Passwords do not match'])
        }
        
    }

    return (
        <form className='signup-form' onSubmit={onSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Username
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
            </label>
            <label>
                Email
                <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Confirm Password
                <input
                    type='password'
                    name='confPassword'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Sign Up</button>

        </form>

    )
}

export default SignUpFormPage