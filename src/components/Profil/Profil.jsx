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
import back from '../../assets/back.svg'


const Profil = () => {

    const {value1, value2, value4} = useContext(UserContext)
    const [details, setDetails] = value1
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


    

    if(isAuthenticated){ 
    return(
        <div className='profil'>
            <Link className="profil__link" to="/">
                     <img className="profil__logo" src={logo} alt="logo The Game Den" />
            </Link>
          <h1 className="profil__title">Hello {details.Pseudo}</h1>
            
        	<div className='profil__pseudo'>Pseudo
            <button className="profil__button" onClick={(e) => {openPseudoModal(e)}}>...</button>
            </div>
            {isModalPseudo ? (<>
            <ModalPseudo onClose={closePseudoModal}/>
            </>) : null}

        	<div className='profil__email'>Email
            <button className="profil__button" onClick={(e) => {openEmailModal(e)}}>...</button>
            </div>
            {isModalEmail ? (<>
            <ModalEmail onClose={closeEmailModal}/>
            </>) : null}

        	<div className='profil__password'>Password
            <button className="profil__button" onClick={(e) => {openPasswordModal(e)}}>...</button>
            </div>
            {isModalPassword ? (<>
            <ModalPassword onClose={closePasswordModal}/>
            </>) : null}

        	<div className='profil__genre'>{details.genre ? details.genre : "Genres"}
            <button className="profil__button" onClick={(e) => {openGenreModal(e)}}>...</button>
            </div>
            {isModalGenre ? (<>
            <ModalGenre onClose={closeGenreModal}/>
            </>) : null}

        	<div className='profil__platform'>{details.platform ? details.platform : "Platfom"}
            <button className="profil__button" onClick={(e) => {openPlatformModal(e)}}>...</button>
            </div>
            {isModalPlatform ? (<>
            <ModalPlatform onClose={closePlatformModal}/>
            </>) : null}

        	<button className="profil__logout" onClick={(e) => logOut(e)}>Log out</button> 
            <Link to="/">
                <img className="profil__link" src={back} alt="back home" />
            </Link>
        </div>
    )
} else {
    return(
    <div className='error'>
    <p className>Please login</p>  
    <Link className="error-link" to="/">Back to homepage</Link>
    </div>
)}
}

export default Profil
