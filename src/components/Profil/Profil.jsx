import './Profil.scss';
import ModalGenre from './ModalGenre/ModalGenre';
import ModalPlatform from './ModalPlatform/ModalPlatform';
import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ModalPseudo from './ModalPseudo/ModalPseudo';
import ModalEmail from './ModalEmail/ModalEmail';
import ModalPassword from './ModalPassword/ModalPassword';
import logo from '../../assets/logo.svg'


const Profil = () => {

    const {value1, value2, value4} = useContext(UserContext)
    const [details, setDetails] = value1
    const [getProfil] = value2;
    const [isAuthenticated, setIsAuthenticated] = value4 
    const navigate = useNavigate();
    const [isModalPseudo, setModalPseudo] = useState(false);
    const [isModalEmail, setModalEmail] = useState(false);
    const [isModalPassword, setModalPassword] = useState(false);
    const [isModalGenre, setModalGenre] = useState(false);
    const [isModalPlatform, setModalPlatform] = useState(false);
   
    const openPseudoModal = (e) => {
        setModalPseudo(true)
    }

    const closePseudoModal = (e) => {
        setModalPseudo(false)
    }

    const openEmailModal = (e) => {
        setModalEmail(true)
    }

    const closeEmailModal = (e) => {
        setModalEmail(false)
    }

    const openPasswordModal = (e) => {
        setModalPassword(true)
    }

    const closePasswordModal = (e) => {
        setModalPassword(false)
    }

    const openGenreModal = (e) => {
        setModalGenre(true)
    }

    const closeGenreModal = (e) => {
        setModalGenre(false)
    }

    const openPlatformModal = (e) => {
        setModalPlatform(true)
    }

    const closePlatformModal = (e) => {
        setModalPlatform(false)
    }

    const logOut = (e) => {
        e.preventDefault();
        console.log('deconnexion');
        localStorage.removeItem('usertoken');
        
        navigate(`/`);
       setIsAuthenticated(false);

    };
    console.log(isAuthenticated)


    

    if(isAuthenticated){ 
    return(
        <div className='profil'>
            <Link className="profil__link" to="/">
                     <img className="profil__logo" src={logo} alt="logo The Game Den" />
                 </Link>
          <h1 className="profil__title">Hello {details.Pseudo}</h1>
            
        	<div className='profil__pseudo'>{details.Pseudo}
            <button className="profil__button" onClick={(e) => {openPseudoModal(e)}}>Edit</button>
            </div>
            {isModalPseudo ? (<>
            <ModalPseudo onClose={closePseudoModal}/>
            </>) : null}

        	<div className='profil__email'>{details.Email}
            <button className="profil__button" onClick={(e) => {openEmailModal(e)}}>Edit</button>
            </div>
            {isModalEmail ? (<>
            <ModalEmail onClose={closeEmailModal}/>
            </>) : null}

        	<div className='profil__password'>*******
            <button className="profil__button" onClick={(e) => {openPasswordModal(e)}}>Edit</button>
            </div>
            {isModalPassword ? (<>
            <ModalPassword onClose={closePasswordModal}/>
            </>) : null}

        	<div className='profil__genre'>{details.genre ? details.genre : "Genres"}
            <button className="profil__button" onClick={(e) => {openGenreModal(e)}}>Edit</button>
            </div>
            {isModalGenre ? (<>
            <ModalGenre onClose={closeGenreModal}/>
            </>) : null}

        	<div className='profil__platform'>{details.platform ? details.platform : "Platfom"}
            <button className="profil__button" onClick={(e) => {openPlatformModal(e)}}>Edit</button>
            </div>
            {isModalPlatform ? (<>
            <ModalPlatform onClose={closePlatformModal}/>
            </>) : null}

        	<button className="profil__logout" onClick={(e) => logOut(e)}>Log out</button> 
        </div>
    )
} else {
    return(
    <div className='error'>
    <p className>Please login</p>  
    <Link className="error-link" to="/">Go to Home</Link>
    </div>
)}
}

export default Profil
