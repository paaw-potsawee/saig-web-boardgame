import { useEffect } from "react"
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const HandleReserve = ({ date,time,room,idGame }) => {
    const { user } = useAuthContext()
    const handleClick = async () => {
        const a = new Date(date)
        a.setHours(time.slice(0,2),0,0)
        const b = a.toISOString().slice(0,-1)+'+00:00'
        console.log(b)
        axios.patch(`http://localhost:3000/reserve/${idGame}/${room}`,
            { "reservetime":b },
            {headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
              }})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
    return (
        <div>
            <button onClick={() => handleClick()}>click bait</button>
        </div>
    )
}

export default HandleReserve