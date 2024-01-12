import './GameDetails.scss'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../context/HomeContext'
import axios from 'axios';

const GameDetails = () => {

    const {id} = useParams();
    console.log(id)

    const [popular, setPopular] = useContext(HomeContext)
    const [gameDetails, setGameDetails]= useState('')
    const [isFavorite, setIsFavorite] = useState(false)

    const findGame = async () => {
        const selectedGame = await popular.results.find((game => game.id === parseInt(id)))
        setGameDetails(selectedGame)

        fetchAdditionalInfo(selectedGame.id)
    }

    const fetchAdditionalInfo = async (gameId) => {
        const apiCall = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=112df870da604d21ba54e2920c7aa5b6`)
        console.log(apiCall)
        setGameDetails(apiCall.data)
    }

    useEffect(()=>{
        findGame()
    }, []); 

    const handleToggleFavorite = async () => {
        if (!isFavorite) {
            await axios.post('http://localhost:3000/api/favorites', {gameId})
        }
        setIsFavorite((prevIsFavorite) => !prevIsFavorite)
    }
    
    //page détail du jeu avec image en fond   
    return(
        <div className='game'>
            <img className="game__img"src={gameDetails.background_image}  alt={gameDetails.name} />
            <h1 className="game__title">{gameDetails.name}</h1>
            <p className="game__release">{gameDetails.released}</p>
            {gameDetails.genres && (
            <>
                {gameDetails.genres.map((genre) => ( 
                <p className="game__genre">{genre.name}</p>
                ))}
            </>
            )}
            <div className="game__meta">{gameDetails.metacritic}</div>
            <p className="game__desc">{gameDetails.description_raw}</p>
            {gameDetails.publishers && (
            <>
                {gameDetails.publishers.map((publisher)=> (
                <p className="game__publisher">Publisher : {publisher.name}</p>
                ))}
            </>
            )}
            {gameDetails.developers && (
            <>
                {gameDetails.developers.map((developer)=>(
                <p className="game__dev">Developpers : {developer.name}</p> 
                ))}
            </>
            )}
            <button className="favorite" onClick={handleToggleFavorite}>
                <img className="favorite__img-" src="" alt='' />
            </button>
        </div>
    )
}

export default GameDetails