import { useParams,Navigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState, useEffect,useRef } from "react"
import axios from 'axios'

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
                    'boardgameName':boargameName.current.value
                },
                { headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }}
            )
            console.log(res)
            if(!!res){
                window.alert('update name successfull')
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
                    'price':price.current.value
                },
                { headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }}
            )
            console.log(res)
            if(!!res){
                window.alert('update price successfull')
                price.current.value = ''
            }
        } catch (error) {
            console.log(error)
        }
    }
    //delete boardgame handle function 
    const handleDelete = async () => {
        console.log('delete')
        try{
            const  res = await axios.delete(`http://localhost:3000/homepage/${id}`,
               { headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }}
            )
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }
    if (isLoading) {
        return <div>
            loading
        </div>
    }

    return (
        <div>
            {boardgame.boardgameName}
            <button onClick={handleDelete}>delete boardgame</button>
            <form onSubmit={handleSubmitName}>
                <label htmlFor="name">edit name</label>
                <input 
                type='text' 
                id='name' 
                ref={boargameName}
                />
                <input type='submit' value='submit' />
            </form>
            <form onSubmit={handleSubmitPrice}>
                <label htmlFor='price'>edit price</label>
                <input 
                type='Number' 
                id='price' 
                ref={price}
                />
                <input type='submit' />
            </form>
        </div>
    )
}

export default EditBoardgame