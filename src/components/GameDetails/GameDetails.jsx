import './GameDetails.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { SearchContext } from '../../context/SearchContext';
import { UserContext} from '../../context/UserContext';
import heart from '../../assets/heart-solid.svg';
import axios from 'axios';

const GameDetails = () => {

    const {id} = useParams();
    const [popular, setPopular] = useContext(HomeContext)
    const [search, setSearch] = useContext(SearchContext)
    const {value1, value4, value6} = useContext(UserContext)
    const [details] = value1
    const [isAuthenticated] = value4
    const [favorites, setFavorites] = value6
    const [isFavoriteGame, setIsFavoriteGame] = useState(false)
    const [gameDetails, setGameDetails]= useState('')
    const userId=details.id;
    const API_KEY = import.meta.env.VITE_API_KEY

//     Display the game details page with the background image
/*     const findPopularGame = async () => {
        const selectedGame = await popular.results.find((game => game.id === parseInt(id)))
        setGameDetails(selectedGame)
        
        if (selectedGame) {
        fetchAdditionalInfo(selectedGame.id)
        }
    } */

/*     const findSearchGame = async () => {
        const selectedGame = await search.results.find((game => game.id === parseInt(id))) 
        setGameDetails(selectedGame)

        if (selectedGame) {
            fetchAdditionalInfo(selectedGame.id)
        }
    } */

/*     const fetchAdditionalInfo = async (gameId) => {
        const apiCall = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
        setGameDetails(apiCall.data)
    }
    useEffect(()=>{
        findPopularGame()
        findSearchGame()
    }, [] );  */

    const fetchGameDetails = async () => {
        const gameId = id
        const apiCall = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
        setGameDetails(apiCall.data)
        const currentGame = apiCall.data.id
        const isFavorite = await favorites.find((favorite) => favorite.GameID === currentGame)
        if (isFavorite) {
            setIsFavoriteGame(true)
        }else{
            setIsFavoriteGame(false)
        }
    }
    useEffect(() => { fetchGameDetails()}, []);
// like and dislike functions


   /*  const favoriteGame = async () => {
        
    }
    useEffect(() => {fetchGameDetails(), favoriteGame()}, [favorites]); */

    const handleToggleFavorite = async () => {
        const currentGame = { gameId : gameDetails.id, gameName : gameDetails.name, gameImage : gameDetails.background_image}
        
        if(!isAuthenticated) return(
            alert("You must be logged in to add a game to your favorites")
            )

        if (!isFavoriteGame) {
            await axios.post(`http://localhost:3000/api/users/${userId}/games`, currentGame)
            setFavorites((prevFavorites) => [...prevFavorites, currentGame])
            setIsFavoriteGame(true)}

        if (isFavoriteGame) {
            await axios.delete(`http://localhost:3000/api/users/${userId}/games`, {data : currentGame})
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.gameId !== currentGame.gameId))
            setIsFavoriteGame(false)
        }
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

            <button className="favorite" onClick={handleToggleFavorite}>
               {isFavoriteGame ? (<p>DISLIKE</p>) : (<p>LIKE</p>)}
                <img className="favorite__img" src="#" alt='' /> 
            </button>
        </div>
    )
}

export default GameDetails