import './Home.scss';
import { useContext, useEffect} from 'react';
import { HomeContext } from '../../context/HomeContext';
import {FilterContext} from '../../context/FilterContext';
import {UserContext} from '../../context/UserContext';
import {Link} from  'react-router-dom';
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY

const Home = () => {
    const [popular] = useContext(HomeContext);
    const {filters} = useContext(FilterContext);
    const {value1, value2, value4, value7} = useContext(UserContext);
    const [details] = value1;
    const [getProfil] = value2;
    const [isAuthenticated, setIsAuthenticated] = value4;
    const [recoGames, setRecoGames] = value7;

    const recommendations = async () => {

        if(isAuthenticated){
           
                const GenreID = details.genres.map(id => id.GenreID);
                const userGenre = GenreID.join(',');
                console.log(userGenre)
                const PlatformID = details.platforms.map(id => id.PlatformID);
                const userPlatform = PlatformID.join(',');
                console.log(userPlatform)
                const genreAndPlatformMatch = await axios.get(`https://game-den-back.onrender.com/api/ext/recommendations?genres=${userGenre}&platforms=${userPlatform}`);
                const reco = genreAndPlatformMatch.data;
        
                setRecoGames(reco);
        }

    };

    useEffect(() => {
       recommendations();
    }, [isAuthenticated, details.genres, details.platforms]); 

     const filteredGames = popular && popular.filter((game) => {
        return (
            (!filters.platform || game.platforms.some((platform) => platform.name === filters.platform)) &&
            (!filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });
    const gamesToDisplay = filters.platform || filters.genre ? filteredGames : popular;
   
     //affichage des recommandations - si utilisateur connecté
     return (
        <div className="home__container">
            <Filter />
            {isAuthenticated ? (

                <>
                    <h1 className="home__title">Recommendations</h1>
                    <div className="home__list">
                        {recoGames.map((game) => (
                            <div key={game.id} className="card">
                                <Link className="card__img-container" to={`/game/${game.id}`}>
                                    <img className="card__img" src={game.cover} alt={game.name} />
                                </Link>
                                <div className="card__list-platforms">
                                {game.platforms.map((platform, index) => (

                                        <img key={`${game.id}-${platform.id}`} className="card__platforms" src={`public/logo/${platform.logo}`} alt={platform.name} />
                                    ))}

                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="error">No recommended games yet. Complete your profile !</p>
                )
            ) : (
                <>
                    <h1 className="home__title">Popular games in 2023</h1>
                    <div className="home__list">
                        {gamesToDisplay && gamesToDisplay.map((game) => (
                            <div key={game.id} className="card">
                                <Link className="card__img-container" to={`/game/${game.id}`}>
                                    <img className="card__img" src={game.cover} alt={game.name} />
                                </Link>
                                <div className="card__list-platforms">
                                    {game.platforms.map((platform, index) => (
                                        <img key={`${game.id}-${platform.id}`} className="card__platforms" src={`public/logo/${platform.logo}`} alt={platform.name} />
                                    ))}
                                </div>
                                <h2 className="card__title">{game.name}</h2>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};


export default Home