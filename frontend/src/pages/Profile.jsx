import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { useEffect,useState } from 'react'

const Profile = () =>{
    const { Logout } = useLogout()
    const { user } = useAuthContext()
    const [reserve,setReserve]  = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/user/history`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                const { bookingHistory } = res.data
                console.log(res)
                setReserve(bookingHistory.bookingHistory)
                bookingHistory.bookingHistory.forEach(a => {
                    console.log(a.boardgameName)
                })
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    },[])

    const handleLogout = () => {
        Logout()
    }
    if(isLoading) {
        return(
            <div>loading</div>
        )
    }
    return(
        <div>
            this is profile
            <button onClick={handleLogout}>logout</button>
            <p>{user.username}</p>
            {reserve.length > 0 ? reserve.map((booking) => {
                return(
                    <div key={booking._id}>
                        {booking.reserveDay}
                        {booking.reserveWhen}
                        {booking.boardgameName}
                    </div>
                )
            }):
                <p> no reservation yet</p>
            }
        </div>
    )

}

export default Profile