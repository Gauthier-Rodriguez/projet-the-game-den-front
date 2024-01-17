import './Profil.scss'
import ModalGenre from './ModalGenre/ModalGenre'
import ModalPlatform from './ModalPlatform/ModalPlatform'
import React, {useState, useEffect, useContext} from "react"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'


const Profil = () => {

    const [details, setDetails, isAuthenticated, setIsAuthenticated]= useContext(UserContext)
    const navigate = useNavigate();
    const [modalGenre, setModalGenre]= useState(false);
    const [modalPlatform, setModalPlatform]= useState(false);


    const openPlatformModal= () => {
        setModalPlatform(true);
    }

    const closePlatformModal= () => {
        setModalPlatform(false)
    }

    const openGenreModal = () => {
        setModalGenre(true)
    }

    const closeGenreModal = () => {
        setModalGenre(false)
    }

    const openPseudoModal= () => {
        setModalPseudo(true)
    }

    const openEmailModal= () => {
        setModalEmail(true)
    }
    const openPasswordModal= () => {
        setModalPassword(true)
    }

// modification des inputs des données du profil   
    const handlePseudoChange = (e) => {
        const newPseudo = e.target.value;
        setDetails((prevDetails) => ({...prevDetails, pseudo : newPseudo}))
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value; 
        setDetails((prevDetails) => ({...prevDetails, email : newEmail}))
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setDetails((prevDetails) => ({...prevDetails, password : newPassword}))
    }

    const logOut = (e) => {
        e.preventDefault();
        console.log('deconnexion');
        localStorage.removeItem('usertoken');
        
        navigate(`/`);
       setIsAuthenticated(false);
    };
    console.log(isAuthenticated)
    //ouverture d'une modale au clic sur boutons genre et plateforme pour pouvoir sélectionner ses favoris
    return(
        <>
          <h1 className="profil__title">Hello {details.pseudo}</h1>
            
        	<div className='pseudo'>{details.Pseudo}<button className="profil__button" onClick={openPseudoModal}></button></div>
        	<div className='email'>{details.Email}<button className="profil__button" onClick={openEmailModal}></button></div>
        	<div className='password'>*******<button className="profil__button" onClick={openPasswordModal}></button></div>
        	<div className='genre'>{details.genre}<button className="profil__button" onClick={openPlatformModal}></button></div>
        	<div className='platform'>{details.platform}<button className="profil__button" onClick={openGenreModal}></button></div>

        	<button className="profil__button" onClick={(e) => logOut(e)}>Log out</button> 
        </>
    )
}

export default Profil
