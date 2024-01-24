import './ModalPlatform.scss'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import close from '../../../assets/close.svg';


const ModalPlatform = ({onClose}) => {
    const {value1} = useContext(UserContext);
    const [details, setDetails] = value1;
    const [platforms, setPlatforms] = useState([]);
    const [userPlatforms, setUserPlatforms] = useState([]);

    const allPlatforms = async () => {
        const response = await axios.get(`http://localhost:3000/api/platform`);
        const platforms = response.data;
        setPlatforms(platforms);
    }
    useEffect(() => {
        allPlatforms();
    }, []);

    const addPlatform = async (e) => {
        const newPlatform = e.target.id;
        console.log("genreId :", newPlatform);
        console.log("id :", details.id);
        await axios.post(`http://localhost:3000/api/users/${details.id}/platform`, {platformId : newPlatform});
        savedPlatforms((prevUserPlatforms) => [...prevUserPlatforms, newPlatform]);
    }
    
    const removePlatform = async (e) => {
        const newPlatform = e.target.id;
        console.log("genreId :", newPlatform);
        console.log("id :", details.id);
        await axios.delete(`http://localhost:3000/api/users/${details.id}/platform`, {data: { platformId: newPlatform }});
        savedPlatforms((prevUserPlatforms) => prevUserPlatforms.filter((userPlatform) => userPlatform.id !== newPlatform));
    }


    const savedPlatforms = async () => {
        const response = await axios.get(`http://localhost:3000/api/users/${details.id}`);
        console.log(response.data.platforms);
        const userPlatforms = response.data.platforms;
        setUserPlatforms(userPlatforms);
    }
    useEffect(() => {
        savedPlatforms();
    }, []);

    return(
        <fieldset className="modal-checkbox">
            <button className="modal__close-button" onClick={onClose}><img className="modal__close-img" src={close} alt="close" /></button>
           
                <div className="modal-checkbox__content"> 
                    <h2 className="modal-checkbox__title">Your Platforms</h2>
                {platforms.map((platform, index) => (    
                <div className="modal-checkbox__input">
                    <input key={index} type="checkbox" id={platform.id} name={platform.Name}
                    checked={userPlatforms.some((userPlatform) => userPlatform.id === platform.id)}
                    onChange={(e) => {e.target.checked ? addPlatform(e):removePlatform(e)}}/>
                    <label for={platform.Name}>{platform.Name}</label>
                </div>))
                }
            </div>
        </fieldset>
    )
}


export default ModalPlatform;