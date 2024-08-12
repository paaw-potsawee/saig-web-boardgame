import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'
import '../style/login.css'
import logo from '../assets/logo.png'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordNotMatch,setPasswordNotMatch] = useState(false)
    const { Signup,error,isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(confirmPassword != password){
            setPasswordNotMatch(true)
            setConfirmPassword('')
            return
        }
        await Signup(username,password)
    }

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <img src={logo} alt='logo' />
            <h3 className='welcome'>Become our member</h3>
            <input
                className='input'
                id='newUsername'
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='username'
            />
            <input
                className='input'
                id='password'
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <input
                className='input'
                id='comfirmPassword'
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='comfirm your password'
            />
            <button disabled={isLoading} className='submitlogin'>Sign up</button>
            {passwordNotMatch && <span className='error'>password not match</span>}
            {error && <span className='error'>{error}</span>}
            <p>Already have an account <Link to="/login">Log in</Link></p>
        </form>
    )
}

export default Signup