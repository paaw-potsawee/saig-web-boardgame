import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import DateTimeDropdown from '../components/DateTimeDropdown'

const Reserve = () => {
    const { id } = useParams();
    const [boardgame, setBoardgame] = useState({})
    const [reserveGame,setReserveGame] = useState([])
    const [rooms, setRooms] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [isLoadingRooms,setIsLoadingRooms] = useState(true)
    const { user } = useAuthContext()

    //fecth baordgame
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/homepage/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setBoardgame(res.data);
        setReserveGame(res.data.reservation || [])
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, [id, user.token]);

    //fetch all rooms include resserved time
    useEffect(() => {
        const fetch = async () => {
            try{
                const roomsList = await axios.get('http://localhost:3000/room/allRooms', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setRooms(roomsList.data)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoadingRooms(false)
            }
        }
        fetch()
    }, [user.token])

    if(isLoading || isLoadingRooms){
        return (
            <div>loading</div>
        )
    }

    return (
        <div>
            {boardgame.boardgameName}
            <DateTimeDropdown reserveGame={reserveGame} rooms={rooms.rooms} idGame={id}/>
        </div>
    )
}

export default Reserve