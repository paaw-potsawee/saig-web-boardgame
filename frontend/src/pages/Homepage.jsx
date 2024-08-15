import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../style/homepage.css'
import { useAuthContext } from '../hooks/useAuthContext'
import Footer from '../components/Footer'

function Homepage() {
    const [listOfBoardgame, setListOfBoardgame] = useState([])
    const [nextPage, setNextPage] = useState([])
    const [previousPage, setPreviousPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const { user } = useAuthContext()
    const location = useLocation()
    const { hash } = useLocation()
    const [loading, setLoading] = useState(true)
    const getBoardgame = async () => {
        const [getSearch, searchinfo] = location.search.split('=')
        let res
        let totalPage = 1
        try {
            if (getSearch == '?search') {
                res = await axios.get(`http://localhost:3000/homepage?page=${currentPage}&limit=12&search=${searchinfo}`)
            } else {
                res = await axios.get(`http://localhost:3000/homepage?page=${currentPage}&limit=12`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            if (hash) {
                const element = document.getElementById(hash.substring(1))
                if (element) {
                    const a = element.getBoundingClientRect().top + window.pageYOffset
                    window.scrollTo({
                        top: a,
                        behavior: 'smooth',
                    })
                }
                const url = new URL(window.location.href);
                url.hash = '';
                window.history.replaceState({}, '', url.toString());
            }
            setListOfBoardgame(res.data.results)
            setCurrentPage(res.data.current.page)
            totalPage = res.data.current.totalPage
            if (res.data.next.page !== null && res.data.next.page <= totalPage) {
                const pages = []
                for(let i=res.data.next.page; i <=totalPage; i++){
                    pages.push(i)
                }
                setNextPage(pages)
            } else { setNextPage([]) }
            if (res.data.previous.page !== null && res.data.previous.page > 0) {
                const pages = []
                for(let i=1; i<=res.data.previous.page; i++){
                    pages.push(i)
                }
                setPreviousPage(pages)
            } else { setPreviousPage([]) }
        }
    }
    useEffect(() => {
        // console.log(location.search.slice(1))
        getBoardgame()
    }, [location, currentPage])
    if (loading) {
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
                        {listOfBoardgame.length > 0 ? listOfBoardgame.map((value) => {
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
                        }) : <div>no boardgame found</div>}
                    </div>
                }
            </div>
            <div className='pagination'>
                {previousPage.length>0 && <div className='pagBtnContainer'>
                    {previousPage.map(page => {
                        return <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
                    })}
                </div>}
                {!!currentPage && <div>
                    <div className='currentPage'>{currentPage}</div>
                </div>}
                {nextPage.length > 0 && <div className='pagBtnContainer'>
                    {nextPage.map((page) => {
                       return( <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>)
                    })}
                </div>}
            </div>
            <hr />
            <Footer />
            <div id="test"></div>
        </>
    )

}

export default Homepage;