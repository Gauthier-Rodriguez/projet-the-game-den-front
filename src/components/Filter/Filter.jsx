import { FilterContext } from '../../context/FilterContext'
import './Filter.scss'
import {useContext, useState} from 'react'

const Filter = () => {

    const {genres, platforms, setFilters} = useContext(FilterContext)
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    
    const handlePlatformChange = (e) => {
        setSelectedPlatform(e.target.value)
        setFilters({ platform: e.target.value, genre: selectedGenre });
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value)
        setFilters({ platform: selectedPlatform, genre: e.target.value });
    }
    
    return(
        <>
                <select className="home__filter" name="platform" onChange={handlePlatformChange} >
                    <option className="filter__default"value="">Platform</option>
                    {platforms.map(platform => (
                    <option key={platform.id} className="filter__list" value={platform.name}>{platform.name}</option>
                ))}
                </select>
                <select className="home__filter" name="genre"  onChange={handleGenreChange}>
                    <option className="filter__default" value="">Genre</option>
                    {genres.map(genre => (
                    <option key={genre.id} className="filter__list" value={genre.name}>{genre.name}</option>
                ))}
                </select>
        </>
    )
}

export default Filter