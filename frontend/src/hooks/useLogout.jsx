import { useAuthContext } from "./useAuthContext"
import Cookies from 'js-cookie'

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const Logout = () => {
        //remove user from storage 
        Cookies.remove('user')

        dispatch({type:'LOGOUT'})
    }
    return { Logout }
}