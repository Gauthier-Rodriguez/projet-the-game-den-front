import './Favorites.scss'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'

const Favorites = () => {
const {value1, value6} = useContext(UserContext);
const [favorites, setFavorites] = value6;
const [details, setDetails] = value1;

const savedFavorites = async () => {
    const response = await axios.get(`http://localhost:3000/api/users/${details.id}/games`);
    setFavorites(response.data);
    console.log(response.data);
} 

useEffect(() => {
    savedFavorites();
}, [details.id]);

    return (
        <div className="favorites__container">
        {favorites.length > 0 ? (
            <>
                <h1 className="favorites__title">Liked</h1>
                <div className="favorites__list">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="favcard">
                            <Link className="favcard__img-container" to={`/game/${favorite.GameID}`}>
                                <img className="favcard__img" src={favorite.Image} alt={favorite.Name} />
                            </Link>
                            <h2 className="favcard__title">{favorite.Name}</h2>
                        </div>
                    ))}
                </div>
                <Footer />
            </>
        ) : (
            <p className="error">No liked games yet. Start adding your favorite games!</p>
        )}
    </div>
    )
};

export default Favorites;