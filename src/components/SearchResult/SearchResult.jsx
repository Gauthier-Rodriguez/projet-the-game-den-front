import './SearchResult.scss'
import { useContext } from 'react'
import {Link} from  'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import {FilterContext} from '../../context/FilterContext'
import Filter from '../Filter/Filter'

const SearchResult = () => {

    const [search, setSearch] = useContext(SearchContext)
    const { filters } = useContext(FilterContext);

    
    const filteredGames = (search.results || []).filter((game) => {
        return (
            (!filters || !filters.platform || game.platforms.some((platform) => platform.platform.name === filters.platform)) &&
            (!filters || !filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });
    
    const gamesToDisplay = (search.results || []).length > 0 ? (filters.platform || filters.genre ? filteredGames : search.results) : [];



    return (
        <div className="home__container">
        <Filter />
        <h1 className="home__title">Results</h1>
        <div className="home__list">
            {gamesToDisplay && (
            <>
                {gamesToDisplay.map((game) => (
                <Link key={game.id} to={`/game/${game.id}`} > 
                <div className="card">
                    <img className="card__img" src={game.background_image} alt={game.name} />
                    <div className="card__list-platforms">
                    {game.platforms && ( 
                    <>
                        {game.platforms.map((platform, index) => ( 
                        <p key={index} className="card__platforms">{platform.platform.name}</p>
                        ))} 
                    </>
                    )}  
                    </div>
                    <h2 className="card__title">{game.name}</h2>
                    <div className="card__information">
                    {game.genres &&(   
                    <> 
                        {game.genres.map((genre, index) => ( 
                        <p key={index} className="card__genre">{genre.name}</p>
                        ))}
                    </>
                    )}
                    <div className="card__meta">{game.metacritic}</div>
                    </div>
                </div>
                </Link>
                ))}
            </>
            )}
        </div>
    </div>
    )
}

export default SearchResult