import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin.jsx'
import '../style/login.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { Login,error,isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Login(username,password)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Username</label>
            <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>password</label>
            <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading}>log in</button>
            {error && <span>{error}</span>}
            <p>Don't have an account yet! <Link to="/signup">Sign up</Link></p>
        </form>
    )
}

export default Login