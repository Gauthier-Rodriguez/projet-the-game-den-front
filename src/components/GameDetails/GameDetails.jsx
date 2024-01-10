import './GameDetails.scss'

const GameDetails = () => {


    //page détail du jeu avec image en fond   
    return(
        <div className='game'>
            <img className="game__img"src="background-image"  alt="" />
            <h1 className="game__title">titre jeu</h1>
            <p className="game__release">date de sortie</p>
            {/* <p className="game__platform">plateforme</p>   ou logo ou les 2          */}
            <p className="game__genre">genre</p>
            <div className="game__meta">note meta</div>
            <p className="game__desc">description_raw</p>
            <p className="game__publisher">publisher</p>
            <p className="game__dev">developper</p> 
            <img src="" alt="" />  
        </div>
    )
}

export default GameDetails