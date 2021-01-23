// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Redirect } from "react-router-dom"
// import { login } from "../../store/session"
// import './LoginForm.css'


// const LoginFormPage = () =>{
//     const dispatch = useDispatch()
//     const sessionUser = useSelector(state => state.session.user)
//     const [credential, setCredential] = useState('')
//     const [password, setPassWord] = useState('')
//     const [errors, setErrors] = useState([])
  
//     if(sessionUser) return(
//         <Redirect to='/' />
//     )

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setErrors([]);
//         return dispatch(login({ credential, password }))
//             .catch((res) => {
//                 if (res.data && res.data.errors) setErrors(res.data.errors);
//             });
//     }

//     return (
//         <form className='login-form' onSubmit={onSubmit}>
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <label>
//                 Username/Email
//                 <input 
//                 type='text'
//                 name='username'
//                 value={credential}
//                 onChange={(e) => setCredential(e.target.value)}
//                 required
//                 />
//             </label>
//             <label>
//                 Password
//                 <input 
//                 type='password'
//                 name='password'
//                 value={password}
//                 onChange={(e) => setPassWord(e.target.value)}
//                 required
//                 />
//             </label>
//             <button disabled={!(credential.length && password.length)} type='Submit'>Login</button>
//         </form>
//     )
    
// }

// export default LoginFormPage