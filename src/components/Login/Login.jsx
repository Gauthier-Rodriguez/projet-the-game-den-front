import './Login.scss'
import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { addActiveClass, removeActiveClass } from './utils';

const Login = () => {
    const {value3, value4} = useContext(UserContext)
    const [login, register] = value3
    const [isAuthenticated, setIsAuthenticated]= value4
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

   const createUser = (e) => {
        e.preventDefault();
   
        const newUser = { // creates new object with name,email, password
          lastname: lastName,
          firstname: firstName,
          pseudo : pseudo,
          email: email,
          password: password
        }
    
        register(newUser).then(res => { // calls the register function from UserFunctions.js and passes newUser as argument
        
         setLastName("");
         setFirstName("");
         setPseudo("");
         setEmail("");
         setPassword("");
        })
      }
    
    const userLogin = (e) =>{
       e.preventDefault();

        const user = {
            email : email,
            password : password
        };
        
        login(user)
        .then(res => {
        if (res) {
            console.log(res)  
        setIsAuthenticated(true);
        console.log("isAuthenticated", isAuthenticated);
        navigate('/');
        }})

    }
    const [isRegisterActive, setRegisterActive] = useState(true);

    const handleRegisterClick = () => {
        addActiveClass('container');
      };
    
      const handleLoginClick = () => {
        removeActiveClass('container');
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
                        <p className="container__text">Enter your email address to register</p>
                        <input className="container__input" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input className="container__input" type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                        <input className="container__input" type="email" placeholder="Email" value={email}onChange={(e) => setEmail(e.target.value)}/>
                        <input className="container__input" type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
                        <button className="container__button" type="submit">SIGN UP</button>
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
                    </form>
                </div>

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