import './Profil.scss';
import ModalGenre from './ModalGenre/ModalGenre';
import ModalPlatform from './ModalPlatform/ModalPlatform';
import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ModalPseudo from './ModalPseudo/ModalPseudo';
import ModalEmail from './ModalEmail/ModalEmail';
import ModalPassword from './ModalPassword/ModalPassword';


const Profil = () => {

    const {value1, value4} = useContext(UserContext)
    const [details, setDetails] = value1
    const [isAuthenticated, setIsAuthenticated] = value4 
    const navigate = useNavigate();
    const [modalGenre, setModalGenre]= useState(false);
    const [modalPlatform, setModalPlatform]= useState(false);
    const [isModalPseudo, setModalPseudo] = useState(false);
    const [isModalEmail, setModalEmail] = useState(false);
    const [isModalPassword, setModalPassword] = useState(false);
   

// modification des inputs des données du profil   
    const handlePseudoChange = (e) => {
        e.preventDefault();
        const newPseudo = e.target.value;
        setDetails((prevDetails) => ({...prevDetails, Pseudo : newPseudo}))
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value; 
        setDetails((prevDetails) => ({...prevDetails, email : newEmail}))
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setDetails((prevDetails) => ({...prevDetails, password : newPassword}))
    }

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
        <div>
            <Link to='/'>HOME</Link>
          <h1 className="profil__title">Hello {details.Pseudo}</h1>
            
        	<div className='pseudo'>{details.Pseudo}
            <button className="profil__button" onClick={(e) => {openPseudoModal(e)}}>Edit</button>
            </div>
            {isModalPseudo ? (<>
            <ModalPseudo onClose={closePseudoModal}/>
            </>) : null}

        	<div className='email'>{details.Email}
            <button className="profil__button" onClick={(e) => {openEmailModal(e)}}>Edit</button>
            </div>
            {isModalEmail ? (<>
            <ModalEmail onClose={closeEmailModal}/>
            </>) : null}

        	<div className='password'>*******
            <button className="profil__button" onClick={(e) => {openPasswordModal(e)}}>Edit</button>
            </div>
            {isModalPassword ? (<>
            <ModalPassword onClose={closePasswordModal}/>
            </>) : null}

        	<div className='genre'>{details.genre ? details.genre : "Genres"}
            <button className="profil__button" onClick={(e) => console.log("genre button")}>Edit</button>
            </div>
        	<div className='platform'>{details.platform ? details.platform : "Platfom"}
            <button className="profil__button" onClick={(e) => console.log("platform button")}>Edit</button>
            </div>

        	<button className="profil__button" onClick={(e) => logOut(e)}>Log out</button> 
        </div>
    )
} else {
    return(
    <>
    <p>Please login</p>
    <Link className="header__login" to="/login">Login/Sign up</Link>    
    </>
)}
}

export default Profil
