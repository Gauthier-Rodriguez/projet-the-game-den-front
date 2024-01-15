import './Pagination.scss'
import {useContext} from 'react'
import { HomeContext } from '../../context/HomeContext'
import {SearchContext} from '../../context/SearchContext'
import ReactPaginate from 'react-paginate'

const ResultsPerPage=20;

const Pagination = () => {
    const {currentPage, totalPages, handlePage, totalOfPages} = useContext(HomeContext)
    
    const handlePageClick = (selected) => {
        const selectedPage = selected + 1; // React-paginate uses zero-based indexing
        handlePage(selectedPage);
    };

    const items = []

    return(
        <div className='pagination'>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onChange={({ selected }) => handlePageClick(selected)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={totalOfPages}
                previousLabel="< previous"
                initialPage={currentPage - 1}
                />
        </div>
    )
}

export default Pagination