import scss from './Home.module.scss';
import clsx from 'clsx';
import Notiflix from 'notiflix';
import ReactPaginate from 'react-paginate';

import { CountryList } from 'components/CountryList/CountryList';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { FilterBar } from 'components/FilterBar/FilterBar';

import {
  fetchAllCountries,
  fetchCountriesByRegion,
  fetchCountryByNameSearch,
} from '../../api/country-api';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams } from 'react-router-dom';

import {
  getCountries,
  getFilterByRegion,
  getPage,
  getTheme,
} from '../../redux/selectors';

import { setPage, setPagination } from '../../redux/paginationSlice';
import { setFilterByRegion } from '../../redux/filterRegionSlice';
import { setCountries } from '../../redux/countriesSlice';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const selectedRegion = searchParams.get('r');

  const dispatch = useDispatch();
  const countries = useSelector(getCountries);
  const region = useSelector(getFilterByRegion);
  const theme = useSelector(getTheme);
  const page = useSelector(getPage);

  // pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const currentItems = countries.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(countries.length / 8);

  // function for changing page
  const handlePageClick = event => {
    const newOffset = (event.selected * 8) % countries.length;
    setItemOffset(newOffset);
    dispatch(setPagination([]));
    dispatch(setPage(event.selected));
  };

  if (currentItems.length < 8) {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
  } else {
    window.onscroll = function () {};
  }

  useEffect(() => {
    if (selectedRegion === region) {
      dispatch(setFilterByRegion(null));
    }

    /**
    |============================
    | fetch for all countries without conditions 
    |============================
  */
    if ((region === null || region === 'all') && !query && !selectedRegion) {
      const fetchCountries = async () => {
        try {
          setIsLoading(true);
          const response = await fetchAllCountries();
          dispatch(setCountries(response));
        } catch (error) {
          setApiError(true);
          Notiflix.Notify.failure(
            `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      };
      fetchCountries();
    } else if (region !== null && countries.length === 0 && region !== 'all') {
      /**
  |============================
  | fetch for countries by region
  |============================
*/
      setSearchParams({ r: region });
      const fetchByRegion = async () => {
        try {
          setIsLoading(true);
          const response = await fetchCountriesByRegion(region);
          dispatch(setCountries(response));
        } catch (error) {
          setApiError(true);
          Notiflix.Notify.failure(
            `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchByRegion();
    } else if (query) {
      /**
  |============================
  | fetch for countries using search
  |============================
*/
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
        } finally {
          setIsLoading(false);
        }
      };
      fetchByName();
    }
  }, [
    apiError,
    countries.length,
    dispatch,
    query,
    region,
    setSearchParams,
    selectedRegion,
  ]);

  // function for handling submit when searching country by its name
  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchCountryName.value;
    if (searchValue === '') {
      Notiflix.Notify.warning(`Please enter country name!`);
    }
    setSearchParams({ query: searchValue });
    setItemOffset(0);
    dispatch(setFilterByRegion(null));
  };

  return (
    <div
      className={clsx(scss.container, {
        [scss.dark]: theme,
        [scss['container-small']]: currentItems.length < 8,
      })}
    >
      {isLoading && <Loader />}
      <div className={scss['search-container']}>
        <SearchBar handleSubmit={handleSubmit} />
        <FilterBar />
      </div>

      <CountryList data={currentItems} />
      <div>
        {pageCount > 1 && (
          <ReactPaginate
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
            disabledLinkClassName={scss['page-controlls-disalbled']}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
