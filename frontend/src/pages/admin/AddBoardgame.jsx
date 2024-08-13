import { useRef } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import '../../style/addBoardgame.css'
import { toast } from 'react-toastify'

const AddBoardgame = () => {
    const boardgameName = useRef()
    const price = useRef()
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(boardgameName.current.value)
        console.log(price.current.value)
        try {
            const res = await axios.post('http://localhost:3000/homepage/', {
                'boardgameName': boardgameName.current.value,
                'price': price.current.value,
            },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                })
            console.log(res)
            // window.alert('succesfully add new boardgame')
            toast.success('successfully add new boardgame')
            boardgameName.current.value = ''
            price.current.value = ''
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error)
        }
    }

    return (
        <div className='addBoardgame'>
            <form onSubmit={handleSubmit}>
                <h2>add boardgame</h2>
                <label htmlFor="boardgamename">boardgame name</label>
                <input
                    type='text'
                    id='boardgamename'
                    ref={boardgameName}
                     />
                <label htmlFor="price">price(bath/hour)</label>
                <input
                    id='price'
                    type='number'
                    ref={price} />
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default AddBoardgame