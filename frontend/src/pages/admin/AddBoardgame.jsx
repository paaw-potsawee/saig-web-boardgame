import { useRef } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

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
            boardgameName.current.value = ''
            price.current.value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            add boardgame
            <form onSubmit={handleSubmit}>
                <label htmlFor="boardgamename">boardgame name: </label>
                <input
                    type='text'
                    id='boardgamename'
                    ref={boardgameName} />
                <label htmlFor="price">price(bath/hour):</label>
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