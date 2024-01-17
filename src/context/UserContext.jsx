import React, {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import axios from 'axios';


//creation contexte pour gérer les données du profil
export const UserContext = createContext('')

export const UserController = ({children}) => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [details, setDetails] = useState({
        pseudo: "",
        email: ""
    })


//récupération des données utilisateur/méthode GET avec apiCall
    const getProfil = async () => {
        try{
            const token = await localStorage.usertoken;
            
            const decoded = await jwtDecode(token);
            console.log(decoded);

            const userData = await axios.get(`http://localhost:3000/api/users/${decoded.id}`)
            console.log(userData.data)

            setDetails(userData.data)
        } catch (error) {
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

//modification des données du profil utilisateur avec MAJ au serveur/méthode PUT    
    const updateProfil = async () => {
     
    }


//deconnexion     
 

   /*  const logOut = () => {
        console.log('deconnexion');
        localStorage.removeItem('usertoken');
        setIsAuthenticated(false);
        navigate(`/`);
    }; */

    useEffect(() => {
        getProfil();
    }, []);

    return(
        <UserContext.Provider value={[details, error, isLoading, getProfil, updateProfil, isAuthenticated, setIsAuthenticated]}>
            {(children)}
        </UserContext.Provider>
    )
}

