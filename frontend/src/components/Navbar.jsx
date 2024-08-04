import { Link,useLocation } from 'react-router-dom';
import '../style/Navbar.css';
import logo from '../assets/logo-pbg.png'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'
import { useEffect, useState } from 'react';
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
    const [hidden, setHidden] = useState('hidden')
    const minWidth = useMediaQuery({ minWidth: 600 })
    const location = useLocation()

    const handleLogout = () => {
        Logout()
    }
    const handleToggle = () => {
        setSearchbar(searchbar.includes('hidden') && !minWidth ? 'searchbar' : 'searchbar hidden')
        setHidden(hidden.includes('hidden') && !minWidth ? 'list' : 'hidden')
    }
    useEffect(() => {
        setSearchbar(window.innerWidth>600 ?'searchbar' : 'searchbar hidden')
        setHidden(window.innerWidth>600 ? 'list':'hidden')
    },[window.innerWidth])
    useEffect(() => {
        if(window.innerWidth < 600){
            setSearchbar('searchbar hidden')
            setHidden('hidden')
        }
    },[location])
    return (
        <>
            <nav>
                <div className='nav-show'>
                    <Link to="/" className='logo'>
                        <img src={logo} alt='logo' />
                    </Link>
                    {!minWidth && <div className='show' onClick={handleToggle}>{<IoReorderThreeOutline />}</div>}
                </div>
                <div className={searchbar}>
                    <input type="text" className='search' placeholder='search' />
                    <button type="submit" className="btn">{<CiSearch />}</button>
                </div>
                <Link className={`home ${hidden}`} to='/'>
                    <TiHomeOutline className='icon'/>home
                </Link>
                <Link className={`contact ${hidden}`} to='/'>
                    <MdOutlineContactPhone className='icon'/>contact
                </Link>
                {!!user ?
                    <Link to="/profile" className={`profile ${hidden}`}>
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