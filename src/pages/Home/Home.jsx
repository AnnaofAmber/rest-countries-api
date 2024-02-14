import scss from './Home.module.scss'
// import { fetchAllCountries } from "api/countries-api"

import { CountryList } from "components/CountryList/CountryList";
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notiflix from "notiflix";
import { useEffect, useState } from "react"
import { getCountries } from '../../redux/selectors';
import { fetchAllCountries } from '../../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../../redux/countriesSlice';
import { setPagination } from '../../redux/paginationSlice';
import ReactPaginate from 'react-paginate';
import { Loader } from 'components/Loader/Loader';

const Home = () => {

const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

const dispatch = useDispatch()
const countries = useSelector(getCountries)


// pagination
const [itemOffset, setItemOffset] = useState(0);
const endOffset = itemOffset + 8;
const currentItems = countries.slice(itemOffset, endOffset);
const pageCount = Math.ceil(countries.length / 8);

const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % countries.length
    setItemOffset(newOffset);
    dispatch(setPagination([]))
  };

useEffect(()=>{
    const fetchCountries = async() =>{
try{
    const response = await fetchAllCountries()
    if(countries.length === 0){
        dispatch(setCountries(response))
    }
}
catch (error) {
    setApiError(true);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
    );
  } finally {
    setIsLoading(false);
  }

    }
    fetchCountries()
})


    return(
        <div className={scss.container}>
            {isLoading && <Loader/>}
            <SearchBar/>
             <CountryList data={currentItems}/>
<div >
<ReactPaginate 
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='page-container'
        />
</div>
        </div>
    )
}
export default Home