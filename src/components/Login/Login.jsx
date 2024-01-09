import './Login.scss'

const Login = () => {

    return(
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form className="container__form">
                    <h1 className="container__title">Créer un compte</h1>
                    <div className="social-icons">
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <p className="container__text">Entrez votre email pour l'inscription</p>
                    <input className="container__input" type="text" placeholder="Nom Prénom"/>
                    <input className="container__input" type="email" placeholder="Email"/>
                    <input className="container__input" type="password" placeholder="Votre mot de passe"/>
                    <button className="container__button">S'INSCRIRE</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form className="container__form">
                    <h1 className="container__title">Vous avez déja un compte ?</h1>
                    <div className="social-icons">
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                        <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <p className="container__text">Identifiez vous avec votre adresse email</p>
                    <input className="container__input" type="email" placeholder="Email"/>
                    <input className="container__input" type="password" placeholder="Votre mot de passe"/>
                    <button className="container__button">SE CONNECTER</button>
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