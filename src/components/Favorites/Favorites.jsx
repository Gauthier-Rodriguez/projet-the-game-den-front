import './Favorites.scss'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Favorites = () => {
const {value1} = useContext(UserContext);
const [details, setDetails] = value1;
const [favorites, setFavorites] = useState([]);

const savedFavorites = async () => {
    const response = await axios.get(`http://localhost:3000/api/users/${details.id}/games`);
    console.log(response.data);
}

useEffect(() => {
savedFavorites()}, []);

    return (
        <>
        
        </>
    )
} 

export default Favorites;