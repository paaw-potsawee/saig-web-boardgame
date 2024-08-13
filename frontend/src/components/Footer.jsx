import '../style/footer.css'
import logo from '../assets/logo-pbg.png'
//import icons
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import igIcon from '../assets/igicon.png'
import lineIcon from '../assets/lineicon.png'


const Footer = () => {
    return (
        <footer className='footer'>
            <img src={logo} alt='logo' />
            <div>
                <div>
                    <div><BsTelephone />TEL. : 099 452 8922</div>
                    <div><MdOutlineEmail />E-MAIL : 67011501@kmitl.ac.th</div>
                </div>
                <div>
                    <div><img src={igIcon} />IG : ppp___.P</div>
                    <div><img src={lineIcon} />LINE ID : blabla</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer