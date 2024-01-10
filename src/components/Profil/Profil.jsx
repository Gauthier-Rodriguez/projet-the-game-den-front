import './Profil.scss'
import ModalGenre from './ModalGenre/ModalGenre'
import ModalPlatform from './ModalPlatform/ModalPlatform'

const Profil = () => {

    return(
        <>
            <h1 className="profil__title">My profil</h1>
            <input className="profil__input" type="text" placeholder="Pseudo" onChange="" />
            <p>ce pseudo n'est pas disponible</p>
            <input className="profil__input" type="email" placeholder="Email" onChange="" />
            <p>l'email est deja utilisé</p>
            <input className="profil__input" type="password" placeholder="Password" onChange="" />
            <p>message alerte avec minimum etc</p>
            <button className="profil__button" onClick="" >Platform</button>
            <ModalPlatform />
            <button className="profil__button" onClick="">Genre</button>
            <ModalGenre />
            <button className="profil__button" onClick>Log out</button>
        </>
    )
}

export default Profil