import { useEffect, useState } from "react"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import '../../style/allusers.css'

const AllUsers = () => {
    const [userList, setUserList] = useState([])
    const { user } = useAuthContext()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user/alluser`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                )
                setUserList(res.data.allUsers)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    if (userList.length == 0) {
        return <div>
            loading
        </div>
    }
    return (
        <>
            <table className="allusers">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AllUsers
