import { Link,useLocation,useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import logo from '../assets/logo-pbg.png'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'
import { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive'
//import icon
import { CiSearch } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { IoIosContact } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md"

const Navbar = () => {
    const { user } = useAuthContext()
    const { Logout } = useLogout()
    const [searchbar, setSearchbar] = useState('searchbar hidden')
    const searchInfo = useRef()
    const [homePath,setHomePath] = useState('')
    const [profilePath,setProfilePath] = useState('')
    const [hidden, setHidden] = useState('hidden')
    const [styleSearch,setStyleSearch]= useState({display:'none',})
    const minWidth = useMediaQuery({ minWidth: 750 })
    const location = useLocation()

    const handleLogout = () => {
        Logout()
    }
    const handleToggle = () => {
        setSearchbar(searchbar.includes('hidden') && !minWidth ? 'searchbar' : 'searchbar hidden')
        setHidden(hidden.includes('hidden') && !minWidth ? 'list' : 'hidden')
        setStyleSearch(styleSearch.display == 'none' ? {display:'grid',}:{display:"none",})
    }
    useEffect(() => {
        setSearchbar(window.innerWidth>600 ?'searchbar' : 'searchbar hidden')
        setHidden(window.innerWidth>600 ? 'list':'hidden')
        setStyleSearch(window.innerWidth>600 ? {display:'grid',}:{display:'none',})
    },[window.innerWidth])
    useEffect(() => {
        if(window.innerWidth < 750){
            setSearchbar('searchbar hidden')
            setHidden('hidden')
            setStyleSearch({display:'none',})
        }
        searchInfo.current.value = ''
        if(location.pathname == '/'){
            setHomePath('home')
        }else{setHomePath('')}
        if(location.pathname == '/profile'){
            setProfilePath('profile')
        }else{setProfilePath('')}
        console.log(location.pathname)
    },[location])
    const navigation = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault()
        if(searchInfo.current.value != ''){
            navigation(`/?search=${searchInfo.current.value.trim().split(" ").join("")}`)
        }
    }
    return (
        <>
            <nav>
                <div className='nav-show'>
                    <Link to="/" className='logo'>
                        <img src={logo} alt='logo' />
                    </Link>
                    {!minWidth && <div className='show' onClick={handleToggle}>{<IoReorderThreeOutline />}</div>}
                </div>
                <form className={searchbar} onSubmit={handleSearch} style={styleSearch}>
                    <input 
                        type="text" 
                        className='search' 
                        placeholder='search' 
                        ref={searchInfo}
                    />
                    <button type="submit" className="btn">{<CiSearch />}</button>
                </form>
                <Link className={`${homePath} ${hidden}`} to='/'>
                    <TiHomeOutline className='icon'/>home
                </Link>
                <Link className={`contact ${hidden}`} to='/'>
                    <MdOutlineContactPhone className='icon'/>contact
                </Link>
                {!!user ?
                    <Link to="/profile" className={`${profilePath} ${hidden}`}>
                        <IoIosContact className='icon'/>Profile
                    </Link>
                    :
                    <Link to="/login" className={`login ${hidden}`}>
                        Login
                    </Link>
                }
                {!!user ?
                    <button className={`logout ${hidden}`} onClick={handleLogout}>Log out</button> :
                    <Link to='/signup' className={`signup ${hidden}`}>Sign up</Link>
                }
            </nav>
            <hr/>
        </>
    )

}

export default Navbar;