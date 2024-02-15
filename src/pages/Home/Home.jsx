import scss from './Home.module.scss'
import { CountryList } from "components/CountryList/CountryList";
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notiflix from "notiflix";
import { useEffect, useState } from "react"
import { getCountries, getFilterByRegion } from '../../redux/selectors';
import { fetchAllCountries, fetchCountriesByRegion} from '../../api/country-api';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../../redux/countriesSlice';
import { setPagination } from '../../redux/paginationSlice';
import ReactPaginate from 'react-paginate';
import { Loader } from 'components/Loader/Loader';
import { FilterBar } from 'components/FilterBar/FilterBar';

const Home = () => {

const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

const dispatch = useDispatch()
const countries = useSelector(getCountries)
const region = useSelector(getFilterByRegion)

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
if(region === null || region === 'all'){
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
    
}
else if(region !== null && countries.length === 0 && region!=='all'){
  const fetchByRegion = async()=>{
    try{
        const response = await fetchCountriesByRegion(region)
            dispatch(setCountries(response))

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
  fetchByRegion()
}
})



    return(
        <div className={scss.container}>
            {isLoading && <Loader/>}
            <SearchBar/>
            <FilterBar/>
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