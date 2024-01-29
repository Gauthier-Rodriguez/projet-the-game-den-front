import './SearchResult.scss'
import { useContext,useState } from 'react'
import {Link} from  'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import {FilterContext} from '../../context/FilterContext'
import Filter from '../Filter/Filter'
import Loader from '../Loader/Loader'
import Footer from '../Footer/Footer'

const SearchResult = () => {

    const [search, setSearch, fetchSearch, isLoading, setIsLoading, fetchResult] = useContext(SearchContext)
    const { filters } = useContext(FilterContext);

    console.log(fetchResult)

    const gamesToDisplay = fetchResult;
    console.log(gamesToDisplay)
    return (
        <div className="search__container">
            
            <h1 className="search__title">Results</h1>    
            <div className="search__list">
            {gamesToDisplay && gamesToDisplay.map((game) => ( 
            <>
                <div key={game.id} className="card">
                    <Link className="card__img-container" to={`/game/${game.id}`}>
                        <img className="card__img" src={game.cover} alt={game.name} />
                    </Link>
                    <div className="card__list-platforms">
                    {game.platforms && game.platforms.map((platform) => (
                        <img key={platform.id} className="card__platforms" src={`public/logo/${platform.logo}`} alt={platform.name} />      
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