import './Login.scss'
import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { addActiveClass, removeActiveClass } from './utils';
import back from '../../assets/back.svg'

const Login = () => {
    const {value3, value4} = useContext(UserContext);
    const [login, register] = value3;
    const [isAuthenticated, setIsAuthenticated]= value4;
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   const createUser = (e) => {
        e.preventDefault();
   
        const newUser = { // creates new object with name,email, password
          lastname: lastName,
          firstname: firstName,
          pseudo : pseudo,
          email: email,
          password: password
        }
    
        register(newUser)
            .then(res => { // calls the register function from UserFunctions.js and passes newUser as argument
        
                setLastName("");
                setFirstName("");
                setPseudo("");
                setEmail("");
                setPassword("");
                setError(null);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            });
    };    
    
    const userLogin = (e) =>{
       e.preventDefault();

        const user = {
            email : email,
            password : password
        };
        
        login(user)
            .then(res => {
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            });
    };

    const [isRegisterActive, setRegisterActive] = useState(true);

    const handleRegisterClick = () => {
        addActiveClass('container');
        addActiveClass('back__link');
    };
    
    const handleLoginClick = () => {
        removeActiveClass('container');
        removeActiveClass('back__link');
    };
      
    return(
        <div className="container-page">
            <div className="container" id="container">
                <div className="form-container sign-up">
                    <form className="container__form" noValidate onSubmit={createUser}>
                        <h1 className="container__title">Create an account</h1>
                        {/* <div className="social-icons">
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                        </div> */}
                        <p className="container__text">Enter yours information to register</p>
                        <input className="container__input" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        <input className="container__input" type="email" placeholder="Email" value={email}onChange={(e) => setEmail(e.target.value)}/>
                        <input className="container__input" type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
                        <button className="container__button" type="submit">SIGN UP</button>
                        {error && <p className="error-message">{error}</p>} {console.log(error)}
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form className="container__form" noValidate onSubmit={userLogin}> 
                        <h1 className="container__title">Already got an account?</h1>
                        {/* <div className="social-icons">
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-google-plus-g"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-facebook-f"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-github"></i></a>
                            <a className="social-icons__link container__link" href="#" ><i className="fa-brands fa-linkedin-in"></i></a>
                        </div> */}
                        <p className="container__text">Login with your email address</p>
                        <input className="container__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className="container__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="container__button" type="submit">LOGIN</button>
                        {/* <a className="container__link" href="#">Forgot your password?</a> */}
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>

                    <Link to="/">
                    <img className="back__link" id="back__link" src={back} alt="back home" />
                    </Link>
                    
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle__panel toggle-left">
                            <h1 className="toggle__title"> Nice to see you again!</h1>
                            <p className="toggle__text">Enter your personal data</p>
                            <button className="container__button hidden" id="login" onClick={handleLoginClick}>LOGIN</button>
                        </div>
                        <div className="toggle__panel toggle-right">
                            <h1 className="toggle__title"> Welcome! </h1>
                            <p className="toggle__text">Register your personal data</p>
                            <button className="container__button hidden" id="register" onClick={handleRegisterClick}>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;