import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.jsx'

import Layout from './Layout/Layout'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Reserve from './pages/reserve'
import Signup from './pages/Signup'
import EditBoardgame from './pages/admin/EditBoardgmae.jsx'
import EditRooms from './pages/admin/EditRooms.jsx'
import AddBoardgame from './pages/admin/AddBoardgame.jsx'

function App() {
    const { user } = useAuthContext()
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/profile"
                        element={!!user ? <Profile /> : <Navigate to='/login' />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to='/' />}
                    />
                    <Route
                        path="/signup"
                        element={!user ? <Signup /> : <Navigate to='/' />}
                    />
                    <Route
                        path="/reserve/:id"
                        element={!!user ? <Reserve /> : <Login />}
                    />
                    <Route
                        path="/editboardgame/:id"
                        element={(!!user && user.roll == 'admin') ? <EditBoardgame /> : <Homepage />}
                    />
                    <Route
                        path='/editrooms'
                        element={(!!user && user.roll == 'admin') ? <EditRooms /> : <Homepage />}
                    />
                    <Route
                        path='/addboardgame'
                        element={(!!user && user.roll == 'admin') ? <AddBoardgame /> : <Homepage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App