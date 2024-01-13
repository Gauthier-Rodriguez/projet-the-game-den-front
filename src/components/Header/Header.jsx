import './Header.scss'
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import {useContext} from 'react'
import { SearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const [search, setSearch, fetchSearch] = useContext(SearchContext)
    const [localSearch, setLocalSearch] = useState('')

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearch(localSearch.toLowerCase())
        navigate('/search')
        //console.log(localSearch)
    }

   

    // if(isAuthenticated){
    // affichage du coeur pour pouvoir accéder à sa page de favoris-pas visible pour visiteur    
    //     return(
    //         <div className="header">
    //             <Link className="header__link" to="/">
    //                 <img className="header__logo" src="" alt="logo The Game Den" />
    //             </Link>
    //             <form className="header__form" onSubmit="">
    //                 <input className="header__input" type="text" value="" placeholder="Search" onChange=" " />
    //                 <button className="header__button" type="submit">
    //                     <img className="header__button-img" src="" />
    //                 </button>
    //             </form>
    //             <p className="header__pseudo">Pseudo</p>
    //             <img className="header__like" src="" alt="logo like" />
    //             <img className="header__profil" src="" alt="logo profil" /> 
    //         </div>
    //     )
    // }
    // else{
        return(
        
            <div className="header">
                <Link className="header__link" to="/">
                    <img className="header__logo" src="" alt="logo The Game Den" />
                </Link>
                <form className="header__form" onSubmit={handleSubmit}>
                    <input className="header__input"  type="text"  placeholder="Search" onChange={(event)=> setSearch(event.target.value)} />
                    <button className="header__button" type="submit">
                        <img className="header__button-img" src="" />
                    </button>
                </form>
                <Link className="header__login" to="/login">Login/Sign up</Link>    
            </div>
        )
    }
// }

export default Header