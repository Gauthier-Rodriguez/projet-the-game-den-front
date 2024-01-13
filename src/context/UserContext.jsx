import React, {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import * as jwt_decode from "jwt-decode"


//creation contexte pour gérer les données du profil
export const UserContext = createContext('')

export const UserController = ({children}) => {

    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        pseudo: "",
        email: "",
        password: "",
    })


//récupération des données utilisateur/méthode GET avec apiCall
    const getProfil = async  () => {
        try{
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
        } catch (error) {
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

//modification des données du profil utilisateur avec MAJ au serveur/méthode PUT    
    const updateProfil = async () => {
        try{
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);

            const updatedDetails = {
                pseudo: details.pseudo,
                email: details.email,
                password: details.password
            }

            const reponses = await axios.put('', updatedDetails, {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil')
        }
    }


//deconnexion     
    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        navigate(`/`)
      }

      useEffect(() => {
        getProfil();
    }, []);   

    return(
        <UserContext.Provider value={{details, error, isLoading, getProfil, updateProfil, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

