import './Home.scss'
import { useContext, useEffect, useState} from 'react'
import { HomeContext } from '../../context/HomeContext'
import {FilterContext} from '../../context/FilterContext'
import {UserContext} from '../../context/UserContext'
import {Link} from  'react-router-dom'
import Filter from '../Filter/Filter'
import Footer from '../Footer/Footer'
import axios from 'axios'
//import InfiniteScroll from 'react-infinite-scroll-component'
const API_KEY = import.meta.env.VITE_API_KEY

const Home = () => {
    const [popular] = useContext(HomeContext)
    const {filters} = useContext(FilterContext);
    const {value1, value4, value7} = useContext(UserContext)
    const [details] = value1

    const [isAuthenticated, setIsAuthenticated] = value4

    const [recoGames, setRecoGames] = value7

    const recommendations = async () => { 
      
        if(isAuthenticated){
            
                const GenreID = details.genres.map(id => id.GenreID);
                const userGenre = GenreID.join(',');
                const PlatformID = details.platforms.map(id => id.PlatformID);
                const userPlatform = PlatformID.join(',');

                const genreAndPlatformMatch = await axios.get(`https://api.rawg.io/api/games?genres=${userGenre}&plateforms=${userPlatform}&key=${API_KEY}&ordering=-added&page_size=40`);
                const reco = genreAndPlatformMatch.data.results;
                setRecoGames(reco);
        } 
    } 

    useEffect(() => {
        recommendations()
    }, [isAuthenticated]); 

    useEffect(() => {
        const jwt = localStorage.getItem('usertoken');
        if(jwt){{setIsAuthenticated(true)}
        }}, [])


    const filteredGames = popular.results && popular.results.filter((game) => {
        return (
            (!filters.platform || game.platforms.some((platform) => platform.platform.name === filters.platform)) &&
            (!filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });
    const gamesToDisplay = filters.platform || filters.genre ? filteredGames : popular.results;
   
     //affichage des recommandations - si utilisateur connecté
     if(isAuthenticated){
        return(
            <div className="home__container">
                <Filter />
                <h1 className="home__title">Recommendations</h1>
                    
                <div className="home__list">
                    {recoGames.map((game) => ( 
                    <>
                        <div key={game.id} className="card">
                                <Link className="card__img-container" to={`/game/${game.id}`}>
                                <img className="card__img" src={game.background_image} alt={game.name} />
                                </Link>
                                <div className="card__list-platforms">
                                {game.parent_platforms.map((platform, index) => (
                                        <img key={`${game.id}-${platform.platform.id}`} className="card__platforms" src={`/src/assets/${platform.platform.slug}.svg`} alt={platform.platform.name} />


                                    ))}
                                </div> 
                                <h2 className="card__title">{game.name}</h2>

                                    
                        </div>
                    </>
                       ))}
                </div>
            </div>
        )
    }
     //sinon affichage des jeux populaires
    //possibilité de filtrer en cliquant sur les boutons plaform/genre/noteMC
    else{ 
   
        return(
            <div className="home__container">
                <Filter />
                <h1 className="home__title">Popular games in 2023</h1>
                    
                <div className="home__list">
                    {gamesToDisplay && gamesToDisplay.map((game) => ( 
                        <div key={game.id} className="card">
                                <Link className="card__img-container" to={`/game/${game.id}`}>
                                <img className="card__img" src={game.background_image} alt={game.name} />
                                </Link>
                                <div className="card__list-platforms">
                                    {game.parent_platforms.map((platform, index) => (
                                        <img key={`${game.id}-${platform.platform.id}`} className="card__platforms" src={`src/assets/${platform.platform.slug}.svg`} alt={platform.platform.name} />

                                    ))}
                                </div> 
                                <h2 className="card__title">{game.name}</h2>
                        </div>
                       ))}
                </div>
                <Footer />
            </div>
        )
    }
}

/*
<script>
                                        const cards = document.querySelectorAll('.card');

                                        function updateCardStyle () {
                                            const windowHeight = window.innerHeight;

                                            cards.forEach(card => {
                                                const cardHeight = card.getBoundingClientRect();
                                                const isVisible = cardHeight.top < windowHeight && cardHeight.bottom >= 0;

                                               if (isVisible) {
                                                card.classList.add('scrolled');
                                               } else {
                                                card.classList.remove('scrolled');
                                               }
                                            });
                                        }

                                        window.addEventListener('scroll', updateCardStyle);
                                        window.addEventListener('resize, updateCardStyle);

                                        updateCardStyle();
                                    </script>
*/ 

export default Home