import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../style/homepage.css'
import { useAuthContext } from '../hooks/useAuthContext'

function Homepage() {
    const [listOfBoardgame, setListOfBoardgame] = useState([])
    const { user } = useAuthContext()

    const getBoardgame = async () => {
        await axios.get('http://localhost:3000/homepage/')
            .then(res => {
                setListOfBoardgame(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getBoardgame()
    }, [])

    return (
        <div className="boardgame">
            {!!user && user.roll == 'admin' && <Link to='editrooms'>edit rooms</Link>}
            {!!user && user.roll == 'admin' && <Link to='addboardgame'>add boardgame</Link>}
            {listOfBoardgame.map((value) => {
                return (
                    <div key={value._id} className="box">
                        <div className="boargameName">
                            {value.boardgameName}
                        </div>
                        <div className="price">
                            price {value.price} bath/hour
                        </div>
                        {!user || user.roll != 'admin' ?
                            <Link to={`/reserve/${value._id}`} className='reserve'>reserve</Link> :
                            <Link to={`/editboardgame/${value._id}`} className='reserve'>Edit</Link>
                        }
                    </div>
                )
            })}

        </div>
    )

}

export default Homepage;