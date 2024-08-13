import { Link } from "react-router-dom"
import '../style/notfound.css'

const Notfound = () => {
    return <div className="notfound">
        <h1>404 - page not found</h1>
        <Link className="link" to='/'>go back to homepage</Link>
    </div>
}

export default Notfound