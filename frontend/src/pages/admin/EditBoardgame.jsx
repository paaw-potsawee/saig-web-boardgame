import { useParams, Navigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import '../../style/editBoardgame.css'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from 'react-toastify'

const EditBoardgame = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const [boardgame, setBoardgame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const boargameName = useRef()
    const price = useRef()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/homepage/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setBoardgame(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [id, user.token]);


    //edit boardgame name handle function
    const handleSubmitName = async (e) => {
        e.preventDefault()
        console.log(boargameName.current.value)
        try {
            const res = await axios.patch(`http://localhost:3000/homepage/${id}`,
                {
                    'boardgameName': boargameName.current.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(res)
            if (!!res) {
                // window.alert('update name successfull')
                toast.success('successfully update name')
                boargameName.current.value = ''
            }
        } catch (error) {
            console.log(error)
        }
    }
    //edit price handle function
    const handleSubmitPrice = async (e) => {
        e.preventDefault()
        console.log(price.current.value)
        try {
            const res = await axios.patch(`http://localhost:3000/homepage/${id}`,
                {
                    'price': price.current.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(res)
            if (!!res) {
                // window.alert('update price successfull')
                toast.success('successfully update price')
                price.current.value = ''
            }
        } catch (error) {
            console.log(error)
        }
    }
    //delete boardgame handle function 
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/homepage/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(res)
            toast.success('boargame deleted')
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoading) {
        return <div>
            loading
        </div>
    }

    return (
        <div className="editBoardgame">
            <h2>
                {boardgame.boardgameName}
            </h2>
            <button onClick={handleDelete}><MdDeleteOutline/>delete</button>
            <form onSubmit={handleSubmitName}>
                <label htmlFor="name">edit name</label>
                <input
                    type='text'
                    id='name'
                    ref={boargameName}
                />
               <button type='submit' className="edit"><CiEdit/> change name</button> 
            </form>
            <form onSubmit={handleSubmitPrice}>
                <label htmlFor='price'>edit price</label>
                <input
                    className="editprice"
                    type='number'
                    id='price'
                    ref={price}
                />
                <button type='submit' className="edit"><CiEdit/> change price</button>
            </form>
        </div>
    )
}

export default EditBoardgame