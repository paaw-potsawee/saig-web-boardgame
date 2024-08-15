import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify'

const HandleReserve = ({ date, time, room, idGame }) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const handleClick = async () => {
        const a = new Date(date)
        a.setHours(time.slice(0, 2), 0, 0)
        a.setHours(a.getHours()+7)
        const b = a.toISOString().slice(0, -1) + '+00:00'
        try {
            const res = await axios.patch(`http://localhost:3000/reserve/${idGame}/${room}`,
                { "reservetime": b },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                })
            console.log(res)
            toast.success(`successfully reserve ${res.data.reserveGame.boardgameName} at ${b.slice(0,10)} ${b.slice(11,19)}`)
            navigate(`/`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={() => handleClick()} className="reserve-btn">reserve now</button>
    )
}

export default HandleReserve