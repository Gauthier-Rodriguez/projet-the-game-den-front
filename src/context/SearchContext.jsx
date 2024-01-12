import { createContext, useState, useEffect} from "react";
import Loader from "../components/Loader/Loader";
import axios from 'axios'; 

export const SearchContext = createContext()

export const SearchController = ({children}) => {

    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchSearch = async () => {
        try{
            const apiCall = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`)
            setSearch(apiCall.data)
            console.log(apiCall.data)
        } 
        catch (error){
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }


    useEffect(() =>{
        fetchSearch()
    }, [])

    return(
        <SearchContext.Provider value={[search, setSearch, fetchSearch]}>
            {isLoading ? ( <Loader />) : (children)} 
         </SearchContext.Provider>
     )

}