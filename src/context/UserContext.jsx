import React, {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
import axios from 'axios';


//creation contexte pour gérer les données du profil
export const UserContext = createContext('')

export const UserController = ({children}) => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [favoriteGames, setFavoriteGames] = useState([])
    const [details, setDetails] = useState({
       
    })
    const [recoGames, setRecoGames] = useState([])
    const [userGenres, setUserGenres] = useState([]);
    const [userPlatform, setUserPlatform] = useState([]);

    const API_KEY = import.meta.env.VITE_API_KEY

    const register = (obj) => {
        return axios.post('https://game-den-back.onrender.com/api/register', {
            lastname: obj.lastname,
            firstname: obj.firstname,
            pseudo: obj.pseudo,
            email : obj.email,
            password : obj.password
        }
        )
        .then(res => console.log('Registered'))
        .catch(error => {
            throw error
        })

    }

    const login = (user) => {
        return axios.post('https://game-den-back.onrender.com/api/login', {
            email : user.email,
            password : user.password
        }
        )
        .then(res => {
            localStorage.setItem('usertoken', res.data) // sets a usertoken into the localstorage coming from res.data
            return res.data
        })
    }
//récupération des données utilisateur/méthode GET avec apiCall
    const getProfil = async () => {
        try{
            const token = await localStorage.usertoken;
            
            const decoded = await jwtDecode(token);

            const userData = await axios.get(`https://game-den-back.onrender.com/api/users/${decoded.id}`)
            setDetails({ ...userData.data, id: decoded.id })
            
            
            const response = await axios.get(`https://game-den-back.onrender.com/api/users/${decoded.id}/games`)
            const favorites = response.data;
            setFavoriteGames(favorites);
        } catch (error) {
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
    getProfil()}, [isAuthenticated, userGenres, userPlatform]);

    useEffect(() => {
        const jwt = localStorage.getItem('usertoken');
        if(jwt){{setIsAuthenticated(true)}
        }}, [])

    return(

        <UserContext.Provider value={{value1 : [details, setDetails], value2 : [getProfil], value3 : [login, register], value4 : [isAuthenticated, setIsAuthenticated], value5 : [error, isLoading], value6 : [favoriteGames, setFavoriteGames], value7 : [recoGames, setRecoGames], value8 : [userGenres, setUserGenres],value9 : [userPlatform, setUserPlatform]}}>
            {(children)}
        </UserContext.Provider>
    )
}

