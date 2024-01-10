import {Routes, Route, useLocation} from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Error from '../Error/Error'
import Login from '../Login/Login'
import Profil from '../Profil/Profil'
import GameDetails from '../GameDetails/GameDetails'
import Favorites from '../Favorites/Favorites'
import Footer from '../Footer/Footer'
import { UserController } from '../../context/UserContext'


function Router() {

    //affichage du header et du footer sur toutes les pages sauf /login et /profil    
    const location = useLocation()

    const pathsWithoutHeader = ['/login', '/profil']
    const isPathWithoutHeader = pathsWithoutHeader.includes(location.pathname)

    const pathsWithoutFooter = ['/login', '/profil']
    const isPathWithoutFooter = pathsWithoutFooter.includes(location.pathname)

    return (
        <>
            <UserController>
            {!isPathWithoutHeader && <Header />}
            <Routes>
                <Route path="*" element={<Error />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
            {!isPathWithoutFooter && <Footer />}
            </UserController>
        </>
    )
}

export default Router