import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin.jsx'
import '../style/login.css'
import logo from '../assets/logo.png'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { Login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Login(username, password)
    }

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <img src={logo} alt='logo' />
            <h3 className='welcome'>Welcome back!</h3>
            {/* <label htmlFor='username'>Username</label> */}
            <input
                className='input'
                id='username'
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='username'
            />
            {/* <label htmlFor='password'>password</label> */}
            <input
                className='input'
                id='password'
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <button disabled={isLoading} className='submitlogin'>log in</button>
            {error && <span className='error'>{error}</span>}
            <Link to="/signup" className='sign-up'>sign up</Link>
            {/* <p>Don't have an account yet! <Link to="/signup">Sign up</Link></p> */}
        </form>
    )
}

export default Login