import './Home.scss'
import { useContext } from 'react'
import { HomeContext } from '../../context/HomeContext'
import {FilterContext} from '../../context/FilterContext'
import {Link} from  'react-router-dom'
import Filter from '../Filter/Filter'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home = () => {

    const [popular, setPopular] = useContext(HomeContext)
    const fetchPopular = useContext(HomeContext)
    const { filters } = useContext(FilterContext);

    const filteredGames = popular.results.filter((game) => {
       
        return (
            (!filters.platform || game.platforms.some((platform) => platform.platform.name === filters.platform)) &&
            (!filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });

    const gamesToDisplay = filters.platform || filters.genre ? filteredGames : popular.results;

    // affichage des recommandations - si utilisateur connecté
    //possibilité de filtrer en cliquant sur les boutons plaform/genre/noteMC 
    // if(isAuthenticated){
    //     return(
    //         <div className="home__container">
    //             <select className="home__filter" name="platform" onChange="" >
    //                 <option className="filter__default"value="">Platform</option>
    //                 <option className="filter__list"value="nom-dynamique">nom-dynamique</option>
    //             </select>
    //             <select className="home__filter" name="genre" onChange="" >
    //                 <option className="filter__default" value="">Genre</option>
    //                 <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
    //             </select>

    //             <h1 className="home__title">Recommendation</h1>
    //             <div className="home__list">
    //                 <div className="card">
    //                     <img className="card__img"src="" alt="" />
    //                     <div className="card__list-logo">
    //                     {/* plateforme sous forme de logo/dynamique en fonction des jeux */}
    //                         <img className="card__logo" src="" alt="" /> 
    //                     </div>
    //                     <h2 className="card__title">Titre du jeu</h2>
    //              
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
     // sinon affichage des jeux populaires
     //possibilité de filtrer en cliquant sur les boutons plaform/genre/noteMC     
    // else{
   
        return(
            <div className="home__container">
                <Filter />
                <h1 className="home__title">Popular games</h1>
                    
                <div className="home__list">
                    {gamesToDisplay.map((game) => ( 
                    <>
                    <div key={game.id} className="card">
                            <Link className="card__img-container" to={`/game/${game.id}`}>
                            <img className="card__img" src={game.background_image} alt={game.name} />
                            </Link>
                            <h2 className="card__title">{game.name}</h2>
                            <div className="card__list-platforms">
                                {game.parent_platforms.map((platform) => (
                                    <p key={platform.id} className="card__platforms"> {platform.platform.name}</p>   
                                ))}
                            </div>          
                    </div>
                    </>
                       ))}
                </div>
                
            </div>
        )
    }
// }

export default Home