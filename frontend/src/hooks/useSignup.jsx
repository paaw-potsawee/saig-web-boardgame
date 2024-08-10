import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const Signup = async (username, password) => {
        setIsLoading(true)
        setError(null)

        axios.post('http://localhost:3000/user/signup',
            { username, password },
            { 'Content-Type': 'application/json'})
        .then(res => {
            //save user to local storage
            const { username, token,roll } = res.data
            const accept = Cookies.get('cookie')
            if(accept == 'accept'){
                Cookies.set('user',JSON.stringify({username,token,roll}),{ expires:30 })
            }
            // localStorage.setItem('user',JSON.stringify({username,token,roll}))

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

    return { Signup, isLoading, error }
}
