import './Profil.scss'
import ModalGenre from './ModalGenre/ModalGenre'
import ModalPlatform from './ModalPlatform/ModalPlatform'
import React, {useState, useEffect, useContext} from "react"
import { UserContext } from '../../context/UserContext'


const Profil = () => {

    const [details, setDetails, logOut]= useContext(UserContext)

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


    //ouverture d'une modale au clic sur boutons genre et plateforme pour pouvoir sélectionner ses favoris
    return(
        <>
            <h1 className="profil__title">Welcome {details.firstName} {details.lastName} to your profil</h1>
            <input className="profil__input" type="text" placeholder={details.pseudo} onChange={handlePseudoChange}/>
            <p>ce pseudo n'est pas disponible</p>
            <input className="profil__input" type="email" placeholder={details.email} onChange={handleEmailChange} />
            <p>l'email est deja utilisé</p>
            <input className="profil__input" type="password" placeholder={details.password} onChange={handlePasswordChange} />
            <p>message alerte avec minimum etc</p>
            <button className="profil__button" onClick={openPlatformModal} >Platform</button>
            {modalPlatform && <ModalPlatform onClose={closePlatformModal}/>}
            <button className="profil__button" onClick={openGenreModal}>Genre</button>
            {modalGenre && <ModalGenre onClose={closeGenreModal}/>}
            <button className="profil__button" onClick={logOut}>Log out</button>
        </>
    )
}

export default Profil
