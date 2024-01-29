import './SearchResult.scss'
import { useContext,useState } from 'react'
import {Link} from  'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import {FilterContext} from '../../context/FilterContext'
import Filter from '../Filter/Filter'
import Loader from '../Loader/Loader'
import Footer from '../Footer/Footer'

const SearchResult = () => {

    const [search, setSearch, isLoading, fetchSearch] = useContext(SearchContext)
    const { filters } = useContext(FilterContext);
    const filteredGames = (search.results || []).filter((game) => {
        return (
            (!filters || !filters.platform || game.platforms.some((platform) => platform.platform.name === filters.platform)) &&
            (!filters || !filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });
    const gamesToDisplay = (search.results || []).length > 0 ? (filters.platform || filters.genre ? filteredGames : search.results) : [];

    return (
        <div className="search__container">
            <Filter />
            <h1 className="search__title">Results</h1>    
            <div className="search__list">
            {gamesToDisplay.map((game) => ( 
            <>
                <div key={game.id} className="card">
                    <Link className="card__img-container" to={`/game/${game.id}`}>
                        <img className="card__img" src={game.background_image} alt={game.name} />
                    </Link>
                    <div className="card__list-platforms">
                    {game.parent_platforms.map((platform) => (
                        <img key={platform.id} className="card__platforms" src={`src/assets/${platform.platform.slug}.svg`} alt={platform.platform.name} />      
                    ))}
                    </div> 
                    <h2 className="card__title">{game.name}</h2>     
                </div>
            </>
            ))}
        </div>
        <Footer />
    </div>
    )
}

export default SearchResult