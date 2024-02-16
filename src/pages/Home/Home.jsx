import scss from './Home.module.scss'
import { CountryList } from "components/CountryList/CountryList";
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notiflix from "notiflix";
import { useEffect, useState } from "react"
import { getCountries, getFilterByRegion } from '../../redux/selectors';
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByName} from '../../api/country-api';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../../redux/countriesSlice';
import { setPagination } from '../../redux/paginationSlice';
import ReactPaginate from 'react-paginate';
import { Loader } from 'components/Loader/Loader';
import { FilterBar } from 'components/FilterBar/FilterBar';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query');

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
if((region === null || region === 'all') && !query){
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
else if(query && countries.length ===0){
const fetchByName = async () => {
  try {
    setIsLoading(true);
    const result = await fetchCountryByName(query);
    if (result.length === 0) {
      Notiflix.Notify.failure(
        `Oops! Seems like we do not have movie with title ${query}!`
      );
    } else {
      dispatch(setCountries(result));
    }
  } catch (error) {
    setApiError(true);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
    );
  } finally {
    setIsLoading(false);
  }
}
fetchByName()
}
})
const handleSubmit = e => {
  e.preventDefault();
  const searchValue = e.currentTarget.elements.searchCountryName.value;
  if(searchValue===""){
      Notiflix.Notify.warning(`Please enter country name!`);
    }
  dispatch(setCountries([]))
  setSearchParams({ query: searchValue });
};


    return(
        <div className={scss.container}>
            {isLoading && <Loader/>}
            <SearchBar handleSubmit={handleSubmit}/>
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