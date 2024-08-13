import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../style/homepage.css'
import { useAuthContext } from '../hooks/useAuthContext'
import Footer from '../components/Footer'

function Homepage() {
    const [listOfBoardgame, setListOfBoardgame] = useState([])
    const { user } = useAuthContext()
    const location = useLocation()
    const { hash } = useLocation()
    const [loading, setLoading] = useState(true)
    const getBoardgame = async () => {
        const [getSearch,searchinfo] = location.search.split('=')
        try {
            const res = await axios.get('http://localhost:3000/homepage/')
            console.log(res.data)
            if(getSearch == '?search'){
                const filtered = res.data.filter(boardgame => {
                    return boardgame.boardgameName.toLowerCase().includes(searchinfo.toLowerCase())
                })
                setListOfBoardgame(filtered)
            }else{
                setListOfBoardgame(res.data)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            if(hash){
                const element = document.getElementById(hash.substring(1))
                if(element){
                    const a = element.getBoundingClientRect().top + window.pageYOffset
                    console.log(a)
                    window.scrollTo({
                        top:a,
                        behavior:'smooth',
                    })
                }
            }
        }
    }
    useEffect(() => {
        // console.log(location.search.slice(1))
        getBoardgame()
    }, [location])
    if(loading){
        return (<div>loading</div>)
    }

    return (
        <>
        <div className="homepage">
            {!!user && user.roll == 'admin' && 
                <div className='adminbtn'>
                    <Link to='editrooms' className='btn'>edit rooms</Link>
                    <Link to='addboardgame' className='btn'>add boardgame</Link>
                    <Link to='allusers' className='btn'>all users</Link>
                </div>}
            {!!location.search ? <div>
                {listOfBoardgame.length > 0 ? <div>
                    <div className='resultSearch'>result for "{location.search.slice(8)}"</div>
                    <div className='boardgame'>
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
                </div> : <div>
                    no boardgame found for "{location.search.slice(8)}" <Link to='/'>back to home page</Link>
                </div>}
            </div> :
                <div className='boardgame'>
                    {listOfBoardgame.length>0 ? listOfBoardgame.map((value) => {
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
                    }):<div>no boardgame currently available</div>}
                </div>
            }
        </div>
        <hr />
        <Footer />
        <div id="test"></div>
        </>
    )

}

export default Homepage;