import './GameDetails.scss'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../context/HomeContext'
import { SearchContext } from '../../context/SearchContext';
import { UserContext} from '../../context/UserContext'
import axios from 'axios';

const GameDetails = () => {

    const {id} = useParams();
    

    const [popular, setPopular] = useContext(HomeContext)
    const [search, setSearch] = useContext(SearchContext)
    const [details] = useContext(UserContext)
    const [gameDetails, setGameDetails]= useState('')
    const [isFavorite, setIsFavorite] = useState(false)

    const userId=details.id;
    console.log(userId)

    const findPopularGame = async () => {
        const selectedGame = await popular.results.find((game => game.id === parseInt(id)))
        setGameDetails(selectedGame)
        
        if (selectedGame) {
        fetchAdditionalInfo(selectedGame.id)
        }
    }

    const findSearchGame = async () => {
        const selectedGame = await search.results.find((game => game.id === parseInt(id))) 
        setGameDetails(selectedGame)

        if (selectedGame) {
            fetchAdditionalInfo(selectedGame.id)
        }
    }

    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchAdditionalInfo = async (gameId) => {
        const apiCall = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
        //console.log(apiCall)
        setGameDetails(apiCall.data)
    }

    useEffect(()=>{
        findPopularGame()
        findSearchGame()
    }, [] ); 

    const handleToggleFavorite = async () => {
        console.log("UserID:", userId);
        const gameId = gameDetails.id
        if (!isFavorite) {
            await axios.post(`http://localhost:3000/api/users/${userId}/games/${gameId}`)
        } else {
            await axios.delete(`http://localhost:3000/api/users/${userId}/games/${gameId}`)
        }
        setIsFavorite((prevIsFavorite) => !prevIsFavorite)
    }
    
    //page détail du jeu avec image en fond   
    return(
        <div className='game'>
            {gameDetails && gameDetails.background_image && <img className="game__img"src={gameDetails.background_image}  alt={gameDetails.name} /> }
                <div className='game__information'>
                    {gameDetails && gameDetails.name && <h1 className="game__title">{gameDetails.name} </h1> }
                        {gameDetails && gameDetails.platforms && (
                        <>
                            {gameDetails.platforms.map((platform) => ( 
                            <p key={platform.id} className="game__platforms">Platform :{platform.platform.name}</p>
                            ))} 
                        </>
                        )}
                        
                        {gameDetails && gameDetails.genres && (
                        <>
                            {gameDetails.genres.map((genre) => ( 
                            <p className="game__genre">{genre.name}</p>
                            ))}
                        </>
                        )}

                    {gameDetails && gameDetails.metacritic && <div className="game__meta">{gameDetails.metacritic}</div>}
                    {gameDetails && gameDetails.released && <p className="game__release">Release date : {gameDetails.released}</p> }
                    {gameDetails && gameDetails.description_raw && <p className="game__desc">{gameDetails.description_raw}</p>}
                    {gameDetails && gameDetails.publishers && (
                    <>
                        {gameDetails.publishers.map((publisher)=> (
                        <p className="game__publisher">Publisher : {publisher.name}</p>
                        ))}
                    </>
                    )}
                    {gameDetails && gameDetails.developers && (
                    <>
                        {gameDetails.developers.map((developer)=>(
                        <p className="game__dev">Developpers : {developer.name}</p> 
                        ))}
                    </>
                    )}
                </div>    
            <button className="favorite" onClick={handleToggleFavorite} >
                <img className="favorite__img-" src="" alt='' /> 
            </button>
        </div>
    )
}

export default GameDetails