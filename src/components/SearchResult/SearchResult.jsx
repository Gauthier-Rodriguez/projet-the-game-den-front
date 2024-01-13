import './SearchResult.scss'
import { useContext } from 'react'
import {Link} from  'react-router-dom'
import { SearchContext } from '../../context/SearchContext'

const SearchResult = () => {

    const [search, setSearch] = useContext(SearchContext)


    return (
        <div className="home__container">
        <select className="home__filter" name="platform" onChange="" >
            <option className="filter__default"value="" disabled>Platform</option>
            <option className="filter__list"value="nom-dynamique">nom-dynamique</option>
        </select>
        <select className="home__filter" name="genre" onChange="" >
            <option className="filter__default" value="" disabled>Genre</option>
            <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
        </select>

        <h1 className="home__title">Results</h1>
        <div className="home__list">
            {search.results && (
            <>
                {search.results.map((game) => (
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