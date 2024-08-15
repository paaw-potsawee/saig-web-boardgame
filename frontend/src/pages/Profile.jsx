
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../style/Profile.css'

const Profile = () => {
    const { user } = useAuthContext()
    const [reserve, setReserve] = useState([])
    const [history, setHistory] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/user/history`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                const { bookingHistory } = res.data
                setReserve(bookingHistory.bookingHistory)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])
    useEffect(() => {
        setHistory(findHistory(reserve))
        setUpcoming(findUpcoming(reserve))
    }, [reserve])
    const findHistory = (bookingHistory) => {
        const now = new Date()
        return bookingHistory.filter(booking => {
            const bookingDay = new Date(booking.reserveDay)
            return now > bookingDay
        })
    }
    const findUpcoming = (bookingHistory) => {
        const now = new Date()
        return bookingHistory.filter(booking => {
            const bookingDay = new Date(booking.reserveDay)
            return now < bookingDay
        })
    }

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }
    return (
        <div className='profile'>
            <h2>sawaddee {user.username}</h2>
            {reserve.length > 0 ?
                <div className='reservation'>
                    <h4>your upcoming events</h4>
                    <table className='upcoming'>
                        <thead>
                            <tr>
                                <th>Boardgame Name</th>
                                <th>Room Name</th>
                                <th>Reservation Date</th>
                                <th>Reservation Time</th>
                            </tr>
                        </thead>
                        {upcoming.length > 0 ?
                            <tbody>
                                {upcoming.map((event) => (
                                    <tr key={event._id}>
                                        <td>{event.boardgameName}</td>
                                        <td>{event.roomName}</td>
                                        <td>{event.reserveDay.split('T')[0]}</td>
                                        <td>{event.reserveDay.split('T')[1].slice(0, 8)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            :
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        }
                    </table>
                    <h4>your history</h4>
                    <table className='upcoming'>
                        <thead>
                            <tr>
                                <th>Boardgame Name</th>
                                <th>Room Name</th>
                                <th>Reservation Date</th>
                                <th>Reservation Time</th>
                            </tr>
                        </thead>
                        {history.length > 0 ?
                            <tbody>
                                {history.map((event) => (
                                    <tr key={event._id}>
                                        <td>{event.boardgameName}</td>
                                        <td>{event.roomName}</td>
                                        <td>{event.reserveDay.split('T')[0]}</td>
                                        <td>{event.reserveDay.split('T')[1].slice(0, 8)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            :
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
                :
                <p> no reservation yet</p>
            }
        </div>
    )

}

export default Profile