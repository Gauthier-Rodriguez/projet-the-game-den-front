import './Profil.scss'
import ModalGenre from './ModalGenre/ModalGenre'
import ModalPlatform from './ModalPlatform/ModalPlatform'
import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import * as jwt_decode from "jwt-decode"

const Profil = () => {

    const navigate = useNavigate();

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        pseudo: "",
        email: "",
        password: "",
    })

    const getProfil = async  () => {
        const token = await localStorage.usertoken;
        const decoded = await jwt_decode(token);
        console.log(decoded);
        setDetails({
          lastName: decoded.lastName,
          firstName: decoded.firstName,
          pseudo: decoded.pseudo,
          email: decoded.email,
          password: decoded.password,
        })
    }
    

    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        navigate(`/`)
      }

    useEffect(() => {
        getProfil();
    }, []);
    
    const handlePseudoChange = (e) => {
        const newPseudo = e.target.value;
        setDetails((prevDetails) => ({...prevDetails, pseudo : newPseudo}))
    };

    return(
        <>
            <h1 className="profil__title">Welcome {details.firstName} {details.lastName} to your profil</h1>
            <input className="profil__input" type="text" placeholder={details.pseudo} onChange={handlePseudoChange}/>
            <p>ce pseudo n'est pas disponible</p>
            <input className="profil__input" type="email" placeholder={details.email} onChange="" />
            <p>l'email est deja utilisé</p>
            <input className="profil__input" type="password" placeholder={details.password} onChange="" />
            <p>message alerte avec minimum etc</p>
            <button className="profil__button" onClick="" >Platform</button>
            <ModalPlatform />
            <button className="profil__button" onClick="">Genre</button>
            <ModalGenre />
            <button className="profil__button" onClick={logOut}>Log out</button>
        </>
    )
}

export default Profil