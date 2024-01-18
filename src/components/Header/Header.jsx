import './Header.scss'
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useContext, useRef} from 'react'
import { SearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import logo from '../../assets/logo.png'
import loupe from '../../assets/loupe.svg'


const Header = () => {
    const [details, setDetails, isAuthenticated, setIsAuthenticated]= useContext(UserContext)
    const [search, setSearch, fetchSearch] = useContext(SearchContext)
    const inputRef = useRef(null);

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSearch = e.target[0].value.toLowerCase();
        setSearch(newSearch);
        fetchSearch(newSearch);
        navigate('/search');
        
        inputRef.current.value = '';
    }
    console.log(isAuthenticated)

      if(isAuthenticated){
     //affichage du coeur pour pouvoir accéder à sa page de favoris-pas visible pour visiteur    
         return(
             <div className="header">
                 <Link className="header__link" to="/">
                     <img className="header__logo" src="../../assets/logo.png" alt="logo The Game Den" />
                 </Link>
                 <form className="header__form" onSubmit={(e) => {handleSubmit(e)}}>
                 <input ref={inputRef} className="header__input"  type="text"  placeholder="Search"/>                     
                 <button className="header__button" type="submit">
                         <img className="header__button-img"  />
                </button>
                 </form>
                 <p className="header__pseudo">Pseudo</p>
                 <img className="header__like" src="" alt="logo like" />
                 <Link className="header__link" to="/profil">
                    <img className="header__profil" src="" alt="logo profil" />
                </Link>
             </div>
         )
     }
     else{ 
        return(
        
            <div className="header">
                <Link className="header__link" to="/">
                    <img className="header__logo" src={logo} alt="logo The Game Den" />
                </Link>
                <form className="header__form" onSubmit={(e) => {handleSubmit(e)}}>
                    <input ref={inputRef} className="header__input"  type="text"  placeholder="Search"/>
                    <button className="header__button" type="submit">
                        <img className="header__button-img" src={loupe} />
                    </button>
                </form>
                <Link className="header__login" to="/login">Login/Sign up</Link>    
            </div> 
        )
    }
}
 

export default Header