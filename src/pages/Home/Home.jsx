import scss from './Home.module.scss'
import { CountryList } from "components/CountryList/CountryList";
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notiflix from "notiflix";
import { useEffect, useRef, useState } from "react"
import { getCountries, getFilterByRegion, getPage, getTheme } from '../../redux/selectors';
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByNameSearch} from '../../api/country-api';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../../redux/countriesSlice';
import { setPage, setPagination } from '../../redux/paginationSlice';
import ReactPaginate from 'react-paginate';
import { Loader } from 'components/Loader/Loader';
import { FilterBar } from 'components/FilterBar/FilterBar';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const Home = () => {

const refInput = useRef()
const [isLoading, setIsLoading] = useState(true);
const [apiError, setApiError] = useState(false);
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query');

const dispatch = useDispatch()
const countries = useSelector(getCountries)
const region = useSelector(getFilterByRegion)
const theme = useSelector(getTheme)
const page = useSelector(getPage)

// pagination

const [itemOffset, setItemOffset] = useState(0);
const endOffset = itemOffset + 8;
const currentItems = countries.slice(itemOffset, endOffset);
const pageCount = Math.ceil(countries.length / 8);

const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % countries.length
    setItemOffset(newOffset);
    dispatch(setPagination([]))
    dispatch(setPage(event.selected))
  };

useEffect(()=>{
if((region === null || region === 'all') && !query ){
  const fetchCountries = async() =>{
    try{
        const response = await fetchAllCountries()
            dispatch(setCountries(response))
    }
    catch (error) {
        setApiError(true);
        Notiflix.Notify.failure(
          `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
        );
      } 
      finally {
        setIsLoading(false);
      }
    
        }
        fetchCountries()
    
}
else if(region !== null && countries.length === 0 && region!=='all'){
  setSearchParams({ query: '' });
  refInput.current.textContent=''
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
      } 
      finally {
        setIsLoading(false);
      }
  }
 
  fetchByRegion()
}
else if(query){
const fetchByName = async () => {
  try {
    setIsLoading(true);
    const result = await fetchCountryByNameSearch(query);
    if (result.length === 0) {
      Notiflix.Notify.failure(
        `Oops! Seems like we do not have country with a name ${query}!`
      );
    } else {
      dispatch(setCountries(result));
    }
  } catch (error) {
    setApiError(true);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
    );
  } 
  finally {
    setIsLoading(false);
  }
}
fetchByName()
}
}, [apiError, countries.length, dispatch, query, region, setSearchParams])
const handleSubmit = e => {
  e.preventDefault();
  const searchValue = e.currentTarget.elements.searchCountryName.value;
  if(searchValue===""){
      Notiflix.Notify.warning(`Please enter country name!`);
    }
  setSearchParams({ query: searchValue });
  setItemOffset(0)
};

    return(
        <div className={clsx(scss.container, {
          [scss.dark]:theme
        })}>
<div className={scss['search-container']}>
<SearchBar refQuery={refInput} handleSubmit={handleSubmit}/>
            <FilterBar />
</div>
            {isLoading && <Loader/>}
             <CountryList data={currentItems}/>
<div >
{pageCount >1 && <ReactPaginate 
  initialPage={page}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className={scss['page-container']}
        pageClassName={scss['page-item']}
        pageLinkClassName={scss['page-link']}
        activeClassName={scss['page-active']}
        previousClassName={scss['page-item-controlls']}
        nextClassName={scss['page-item-controlls']}
        previousLinkClassName={scss['page-controlls']}
        nextLinkClassName={scss['page-controlls']}
        breakLinkClassName={scss['page-break']}
        />}
</div>
        </div>
    )
}
export default Home