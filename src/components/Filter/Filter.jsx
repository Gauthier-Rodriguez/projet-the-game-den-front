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
            <div className='filter'>
                <select className="filter__title" name="platform" onChange={handlePlatformChange} >
                    <option>Platform</option>
                    {platforms.map(platform => (
                    <option key={platform.id} className="filter__option" value={platform.name}>{platform.name}</option>
                ))}
                </select>
                <select className="filter__title" name="genre"  onChange={handleGenreChange}>
                    <option>Genre</option>
                    {genres.map(genre => (
                    <option key={genre.id} className="filter__option" value={genre.name}>{genre.name}</option>
                ))}
                </select>
            </div>    
        </>
    )
}

export default Filter