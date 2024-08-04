import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { Signup,error,isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Signup(username,password)
        console.log(error,isLoading)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>
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
            <button disabled={isLoading}>Sign up</button>
            {error && <div>{error}</div>}
            <p>Already have an account <Link to="/login">Log in</Link></p>
        </form>
    )
}

export default Signup