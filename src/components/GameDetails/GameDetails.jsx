import './GameDetails.scss'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../context/HomeContext'

const GameDetails = () => {

    const {id} = useParams();
    console.log(id)

    const [popular, setPopular] = useContext(HomeContext)
    const [gameDetails, setGameDetails]= useState('')

    const findGame = async () => {
        const selectedGame = await popular.results.find((game => game.id === parseInt(id)))
        setGameDetails(selectedGame)
    }

    useEffect(()=>{
        findGame()
    }, [])
    //page détail du jeu avec image en fond   
    return(
        <div className='game'>
            {}
            <img className="game__img"src={gameDetails.background_image}  alt={gameDetails.name} />
            <h1 className="game__title">{gameDetails.name}</h1>
            <p className="game__release">{gameDetails.released}</p>
            
            <p className="game__genre">{gameDetails.genres}</p>
            <div className="game__meta">note meta</div>
            <p className="game__desc">description_raw</p>
            <p className="game__publisher">{gameDetails.publisher}</p>
            <p className="game__dev">{gameDetails.developper}</p> 
            <img src="" alt="" />  
        </div>
    )
}

export default GameDetails