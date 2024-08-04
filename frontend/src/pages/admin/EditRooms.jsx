import { useEffect,useState } from "react"
import axios from 'axios'

const EditRooms = () => {
    const [rooms,setRooms] = useState()
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const fetch = async ()=> {
            try {
                const res = await axios.get('http://localhost:3000/room/allRooms')
                const { rooms:getRooms }  = res.data
                setRooms(getRooms)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetch()
    },[])

    const handleDeleteRoom = (id) => {
        console.log(id)
        //axios.delete(`http://localhost:3000/room/${id}`)
    }

    if(isLoading) {
        return(
            <div>
                loading
            </div>
        )
    }
    return (
        <div>
            edit rooms
            {rooms.map(room => {
                return (
                    <div key={room._id}>
                        {room.roomName}
                        <button onClick={() => handleDeleteRoom(room._id)}>edit room</button>
                    </div>
                )
            })}
        </div>
    )
}

export default EditRooms