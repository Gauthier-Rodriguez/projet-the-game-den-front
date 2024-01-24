import './ModalGenre.scss'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';


const ModalGenre = ({onClose}) => {
    const {value1} = useContext(UserContext);
    const [details, setDetails] = value1;
    const [genres, setGenres] = useState([]);
    const [userGenres, setUserGenres] = useState([]);

    const allGenres = async () => {
        const response = await axios.get(`https://game-den-back.onrender.com/api/genre`);
        console.log(response.data);
        const genres = response.data;
        setGenres(genres);
    }
    useEffect(() => {
        allGenres();
    }, []);

    const addGenre = async (e) => {
        const newGenre = e.target.id;
        console.log("genreId :", newGenre);
        console.log("id :", details.id);
        await axios.post(`https://game-den-back.onrender.com/api/users/${details.id}/genre`, {genreId : newGenre});
        savedGenres((prevUserGenres) => [...prevUserGenres, newGenre]);
    }
    
    const removeGenre = async (e) => {
        const newGenre = e.target.id;
        console.log("genreId :", newGenre);
        console.log("id :", details.id);
        await axios.delete(`https://game-den-back.onrender.com/api/users/${details.id}/genre`, {data: { genreId: newGenre }});
        savedGenres((prevUserGenres) => prevUserGenres.filter((userGenre) => userGenre.id !== newGenre));
    }


    const savedGenres = async () => {
        const response = await axios.get(`https://game-den-back.onrender.com/api/users/${details.id}`);
        console.log(response.data.genres);
        const userGenres = response.data.genres;
        setUserGenres(userGenres);
    }
    useEffect(() => {
        savedGenres();
    }, []);

    return(
        <fieldset>
            <legend>Choose your genre</legend>
        {genres.map((genre, index) => (    
            <div>
                <input key={index} type="checkbox" id={genre.id} name={genre.Name}
                checked={userGenres.some((userGenre) => userGenre.id === genre.id)}
                 onChange={(e) => {e.target.checked ? addGenre(e):removeGenre(e)}}/>
                <label for={genre.Name}>{genre.Name}</label>
            </div>))
            }
            <button className="modal__button" onClick={onClose}>X</button>
        </fieldset>
    )
}


export default ModalGenre;