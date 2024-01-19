import './GameDetails.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { SearchContext } from '../../context/SearchContext';

import { UserContext} from '../../context/UserContext'
import coeur from '../../assets/coeur.svg'

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

    return (
        <>
          <div className='game'>
            {gameDetails && gameDetails.background_image && <img className="game__img" src={gameDetails.background_image} alt={gameDetails.name} />}
            <div className='game__information'>
              {gameDetails && gameDetails.name && <h1 className="game__title">{gameDetails.name}</h1>}
              <div className='game__information game__information--left'>
                <h2 className='platforms__title'>Platforms :</h2>
                {gameDetails && gameDetails.parent_platforms && (
                  <div className='plateforms__list'>
                    {gameDetails.platforms.map((platform) => (
                      <p key={platform.id} className="platforms__name">{platform.platform.name}</p>
                    ))}
                  </div>
                )}
                <h2 className='genres__title'>Genres :</h2>
                {gameDetails && gameDetails.genres && (
                  <div className='genres__list'>
                    {gameDetails.genres.map((genre) => (
                      <p key={genre.id} className="game__name">{genre.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='game__information game__information--right'>
              {gameDetails && gameDetails.released && <p className="game__release">Release date: {gameDetails.released}</p>}
              {gameDetails && gameDetails.publishers && (
                <>
                  <h2>Publisher:</h2>
                  {gameDetails.publishers.map((publisher) => (
                    <p key={publisher.id} className="game__publisher">{publisher.name}</p>
                  ))}
                </>
              )}
              {gameDetails && gameDetails.developers && (
                <>
                  <h2>Developers:</h2>
                  {gameDetails.developers.map((developer) => (
                    <p key={developer.id} className="game__dev">{developer.name}</p>
                  ))}
                </>
              )}
            </div>
            {gameDetails && gameDetails.description_raw && <p className="game__desc">{gameDetails.description_raw}</p>}
          </div>
      
          <button className="favorite" onClick={handleToggleFavorite}>
            <img className="favorite__img-" src="" alt='' />
          </button>
        </>
    );
}      


export default GameDetails