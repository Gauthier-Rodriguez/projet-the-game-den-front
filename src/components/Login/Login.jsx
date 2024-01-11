import './Login.scss'
import React, {useState} from 'react'
import {register, login} from '../../logic/AuthFunction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const testLogin = (e) =>{
        e.preventDefault()

        const user = {
            email : email,
            password : password
        }
        
        
        login(user).then(res => {
            if(res) {
                navigate('/')
            }
        })

    }

    const createUser = (e) => {
        e.preventDefault()
   
        const newUser = { // creates new object with name,email, password
          lastname: lastName,
          firstname: firstName,
          pseudo : pseudo,
          email: email,
          password: password
        }
    
        register(newUser).then(res => { // calls the register function from UserFunctions.js and passes newUser as argument
         console.log("coucou")
         setLastName("");
         setFirstName("");
         setPseudo("");
         setEmail("");
         setPassword("");

            navigate(`/profil`) // then navigates to login
        })
      }

    return(
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form className="container__form" noValidate onSubmit={createUser}>
                    <h1 className="container__title">Créer un compte</h1>
                    {/* <div className="social-icons">
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                    </div> */}
                    <p className="container__text">Entrez votre email pour l'inscription</p>
                    <input className="container__input" type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input className="container__input" type="text" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="container__input" type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                    <input className="container__input" type="email" placeholder="Email" value={email}onChange={(e) => setEmail(e.target.value)}/>
                    <input className="container__input" type="password" placeholder="Votre mot de passe" value={password}onChange={(e) => setPassword(e.target.value)}/>
                    <button className="container__button" type="submit">S'INSCRIRE</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form className="container__form" noValidate onSubmit={testLogin}> 
                    <h1 className="container__title">Vous avez déja un compte ?</h1>
                    {/* <div className="social-icons">
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                    </div> */}
                    <p className="container__text">Identifiez vous avec votre adresse email</p>
                    <input className="container__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="container__input" type="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="container__button" type="submit">SE CONNECTER</button>
                    <a className="container__link" href="#">Vous avez oublié votre mot de passe ?</a>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle__panel toggle-left">
                        <h1 className="toggle__title"> Content de vous revoir  !</h1>
                        <p className="toggle__text">Entrer vos informations personnelles</p>
                        <button className="container__button hidden" id="login">SE CONNECTER</button>
                    </div>
                    <div className="toggle__panel toggle-right">
                        <h1 className="toggle__title"> Bonjour, bienvenue ! </h1>
                        <p className="toggle__text">Enregistrer vos informations personnelles</p>
                        <button className="container__button hidden" id="register">S'INSCRIRE</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login