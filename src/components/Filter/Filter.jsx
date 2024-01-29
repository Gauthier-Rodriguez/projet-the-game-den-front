import { FilterContext } from '../../context/FilterContext'
import './Filter.scss'
import {useContext, useState, useEffect} from 'react'

const Filter = () => {

    const {genres, platforms, setFilters} = useContext(FilterContext)
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')

    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem('filters'));
        if (storedFilters) {
            setSelectedPlatform(storedFilters.platform)
            setSelectedGenre(storedFilters.genre)
        }
    }, []);
    
    const handlePlatformChange = (e) => {
        const platform = e.target.value
        setSelectedPlatform(platform)
        setFilters({ platform, genre: selectedGenre });

        localStorage.setItem('filters', JSON.stringify({ platform, genre: selectedGenre }));
    }

    const handleGenreChange = (e) => {
        const genre = e.target.value
        setSelectedGenre(genre)
        setFilters({ platform: selectedPlatform, genre });

        localStorage.setItem('filters', JSON.stringify({ platform: selectedPlatform, genre }));
    }
    
    return(
        <>
            <div className='filter'>
                <select className="filter__title" name="platform" onChange={handlePlatformChange} >
                    <option>Platform</option>
                    {platforms && platforms.map(platform => (
                        <option key={platform.id} className="filter__option" value={platform.name}>{platform.name}</option>
                    ))}
                </select>

                <select className="filter__title" name="genre"  onChange={handleGenreChange}>
                    <option>Genre</option>
                    {genres && genres.map(genre => (
                        <option key={genre.id} className="filter__option" value={genre.name}>{genre.name}</option>
                    ))}
                </select>
            </div>    
        </>
    )
}

export default Filter