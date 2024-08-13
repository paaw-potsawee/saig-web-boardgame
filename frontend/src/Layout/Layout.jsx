import { Outlet,useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';

const Layout = () => {
    const location = useLocation();
    const hiddenNav = ['/login', '/signup'];

    // Check if the current route should hide the Navbar
    const hide = hiddenNav.includes(location.pathname);
    return (
        <div className="container">
            {!hide && <Navbar />}
            <Outlet />
        </div>
    )
}
export default Layout;