import { createContext, useState, useEffect} from "react";
import Loader from "../components/Loader/Loader";
import axios from 'axios'; 

export const HomeContext = createContext('')

export const HomeController = ({children}) => {
    
    const [popular, setPopular] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage]= useState(1)
    const [totalPages, setTotalPages]= useState(1)
    const [totalOfPages, setTotalOfPages] = useState(0);

    
    const ResultsPerPage = 50;
    
    //console.log(totalOfPages)

    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchPopular = async (page = 1) => {

        try{
            const apiCall = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-01-01,2023-12-31&ordering=-added&page=${page}`)
            
            const sortedResults = apiCall.data.results.sort((a, b) => {
                const releaseDateA = new Date(a.released).getTime() || 0;
                const releaseDateB = new Date(b.released).getTime() || 0;
                return releaseDateA - releaseDateB;
            });

            setPopular({ ...apiCall.data, results: sortedResults });
            setTotalPages(apiCall.data.count || 1)
             
        } catch (err) {
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const handlePage = (newPage) => {
        setCurrentPage(newPage)
        fetchPopular(newPage)
    }
    
    useEffect(()=>{
        fetchPopular(currentPage), 
        setTotalOfPages(Math.ceil(parseInt(totalPages,20) / ResultsPerPage));
    }, [currentPage, totalPages])

    return(
        <HomeContext.Provider value={[popular, setPopular, currentPage, totalPages, handlePage]}>
            {isLoading ? ( <Loader />) : (children)} 
         </HomeContext.Provider>
     )

}

