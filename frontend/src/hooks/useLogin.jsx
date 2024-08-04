import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const Login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        axios.post('http://localhost:3000/user/login',
            { username, password },
            { 'Content-Type': 'application/json'})
        .then(res => {
            //save user to local storage
            console.log(res.data)
            const { username, token,roll } = res.data
            localStorage.setItem('user',JSON.stringify({username,token,roll}))

            //update AuthContext
            console.log(res.data)
            dispatch({type:'LOGIN',payload : {username,token,roll}})
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.response.data.error)
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return { Login, isLoading, error }
}
