import './GameDetails.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext} from '../../context/UserContext';
import heart from '../../assets/heart.svg';
import solidHeart from '../../assets/solidHeart.svg';
import axios from 'axios';
import Loader from '../Loader/Loader';
import pc from '../../assets/pc.svg';

const GameDetails = () => {

    const {id} = useParams();
    const {value1, value4, value6} = useContext(UserContext)
    const [details] = value1
    const [isAuthenticated] = value4
    const [favorites, setFavorites] = value6
    const [isFavoriteGame, setIsFavoriteGame] = useState(false)
    const [gameDetails, setGameDetails]= useState('')
    const [showFullDescription, setShowFullDescription]=useState(false)
    const userId=details.id;
    const API_KEY = import.meta.env.VITE_API_KEY
    const [isLoading, setIsLoading] = useState(false)
   
    const fetchGameDetails = async () => {

      try{
          setIsLoading(true)
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
        } catch (err) {
            console.log(err)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => { fetchGameDetails()}, []);

    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [gameDetails]);

    const handleToggleFavorite = async () => {
        const currentGame = { gameId : gameDetails.id, gameName : gameDetails.name, gameImage : gameDetails.background_image};
        if(!isAuthenticated) return(
            alert("You must be logged in to add a game to your favorites")
            );

        if (!isFavoriteGame) {
            await axios.post(`https://game-den-back.onrender.com/api/users/${userId}/games`, currentGame);
            setFavorites((prevFavorites) => [...prevFavorites, currentGame]);
            setIsFavoriteGame(true);
          };

        if (isFavoriteGame) {
            await axios.delete(`https://game-den-back.onrender.com/api/users/${userId}/games`, {data : currentGame});
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.gameId !== currentGame.gameId));
            setIsFavoriteGame(false);
        };
    };
    //page détail du jeu avec image en fond   

    const toggleDescription = () => {
      // Utilisation de l'opérateur de négation pour basculer entre true et false
      setShowFullDescription(!showFullDescription);
    };

    return (
      <>
      {isLoading && <Loader />}
      <div className='game'>
        {gameDetails && gameDetails.background_image && (
          <img className="game__img" src={gameDetails.background_image} alt={gameDetails.name} />
        )}
        {gameDetails && gameDetails.released && (
          <p className="game__release">{gameDetails.released}</p>
        )}
        {gameDetails && gameDetails.parent_platforms && (
          <div className='game__list-parent'>
            {gameDetails.parent_platforms.map((platform) => (
              <img
                key={`${platform.id}-${platform.platform.id}`}
                className="game__parent-platform"
                src={`/src/assets/${platform.platform.slug}.svg`}
                alt={platform.platform.name}
              />
            ))}
          </div>
          )}
          {gameDetails && gameDetails.name && (
            <h1 className="game__title">{gameDetails.name}</h1>
          )}
          {isFavoriteGame ? (
            <div onClick={handleToggleFavorite}>
              <img className="heart-solid" src={solidHeart} alt="Solid Heart" />
            </div>
          ) : (
            <div onClick={handleToggleFavorite}>
              <img className="heart-outline" src={heart} alt="Outline Heart" />
            </div>
          )}
    
          <div className='game__information game__information--left'>
            {gameDetails && gameDetails.genres && (
              <div className='information'>
                <h2 className='information__title'>Genres:</h2>
                {gameDetails.genres.map((genre) => (
                  <p key={genre.id} className="information__name">
                    {genre.name}
                  </p>
              ))}
            </div>
              )}
          {gameDetails && gameDetails.publishers && (
            <div className='information'>
              <h2 className='information__title'>Publishers:</h2>
              {gameDetails.publishers.map((publisher) => (
                <p key={publisher.id} className="information__name">
                  {publisher.name}
                </p>
              ))}
            </div>
          )}
        </div>
    
        <div className='game__information game__information--right'>
        {gameDetails && gameDetails.platforms && (
          <div className='information information--platforms'>
            <h2 className='information__title'>Platforms:</h2>
            {gameDetails.platforms.map((platform) => (
              <p key={platform.platform.id} className="information__name">
                {platform.platform.name}
               </p>
            ))}
        </div>
        )}
          {gameDetails && gameDetails.developers && (
            <div className='information'>
              <h2 className='information__title'>Developers:</h2>
              {gameDetails.developers.map((developer) => (
                <p key={developer.id} className="information__name">
                  {developer.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='game__description'>
          <h2 className='game__title-desc'>About</h2>
          {gameDetails && gameDetails.description_raw && (
          <div>
            <p className={`game__text ${showFullDescription ? 'expanded' : ''}`}>
            {showFullDescription
              ? gameDetails.description_raw
              : gameDetails.description_raw.slice(0, 100) + '...'}
            </p>
            {gameDetails.description_raw.length > 100 && (
            <button className="game__button" onClick={toggleDescription}>
              {showFullDescription ? 'Read less' : 'Read more'}
            </button>
            )}
          </div>
          )}
         </div>
      </>
    );   
}     


export default GameDetails

