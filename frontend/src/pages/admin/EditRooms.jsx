import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import { useAuthContext } from "../../hooks/useAuthContext"
import '../../style/editRoom.css'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify'

const EditRooms = () => {
    const [rooms, setRooms] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuthContext()
    const newRoomName = useRef()
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3000/room/allRooms')
                const { rooms: getRooms } = res.data
                setRooms(getRooms)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetch()
    }, [])

    const handleDeleteRoom = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/room/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(res)
            // window.alert('room deleted')
            toast.success('room deleted')
        } catch (error) {
            console.log(error)
            // window.alert(error.response.data.error)
            toast.error(error.response.data.error)
        }
    }
    const handleAddNewRoom = async (e) => {
        e.preventDefault()
        if (confirm(`are you sure you want to add new roomm name ${newRoomName.current.value}`)) {
            try {
                const res = await axios.post(`http://localhost:3000/room`,
                    {
                        'roomName': newRoomName.current.value
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                )
                console.log(res)
                // window.alert('new room added')
                toast.success('new room added')
                newRoomName.current.value = ''
            } catch (error) {
                console.log(error)
                // window.alert(error.response.data.error)
                toast.error(error.response.data.error)
            }
          } 
    }
    const handleUpdateRoom = async (id, roomName) => {
        const newName = prompt('new room name', roomName)
        if(newName != null){
            try {
                const res = await axios.patch(`http://localhost:3000/room/${id}`,
                    {
                        'roomName': newName,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                )
                console.log(res)
                // window.alert(`change '${roomName}' to '${newName}'`)
                toast.success(`change '${roomName}' to '${newName}'`)
            } catch (error) {
                console.log(error.response.data)
                // window.alert(error.response.data.error)
                toast.error(error.response.data.error)
            }
        }
    }
    if (isLoading) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div className="EditRooms">
            <h2>edit rooms</h2>
            <form onSubmit={handleAddNewRoom}>
                <h4>add new room</h4>
                <input type="text" ref={newRoomName} placeholder="new room name" required/>
                <button type='submit' className='addRoom'>add new room</button>
            </form>
            <div>
                {rooms.map(room => {
                    return (
                        <div key={room._id}>
                            <div>room name : {room.roomName}</div>
                            <button onClick={() => handleUpdateRoom(room._id, room.roomName)} className="editRoom">
                                <CiEdit /> edit room name
                            </button>
                            <button onClick={() => handleDeleteRoom(room._id)} className="deleteRoom">
                                <MdDeleteOutline />delete room
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditRooms