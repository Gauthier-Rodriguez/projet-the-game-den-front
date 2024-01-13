import { createContext, useState, useEffect} from "react";
import Loader from "../components/Loader/Loader";
import axios from 'axios'; 

export const HomeContext = createContext('')

export const HomeController = ({children}) => {
    
    const [popular, setPopular] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchPopular = async () =>{

        try{
            const apiCall = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31&ordering=-added`)
            setPopular(apiCall.data)
             console.log(apiCall.data) 
        } catch (err) {
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchPopular()
    }, [])

    return(
        <HomeContext.Provider value={[popular, setPopular]}>
            {isLoading ? ( <Loader />) : (children)} 
         </HomeContext.Provider>
     )

}

