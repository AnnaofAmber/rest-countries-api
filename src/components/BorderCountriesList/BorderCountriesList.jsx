import scss from './BorderCountriesList.module.scss';

import Notiflix from 'notiflix';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBorderCountries, getTheme } from '../../redux/selectors';
import { setBorderCountries } from '../../redux/borderCountriesSlice';
import { fetchCountryByCioc } from 'api/country-api';

const BorderCountriesList = ({ cioc, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const dispatch = useDispatch();

  const borderCountries = useSelector(getBorderCountries);
  const theme = useSelector(getTheme);

  useEffect(() => {
    /**
      |============================
      | fetch for border countries
      |============================
    */
    const fetchByCioc = async () => {
      try {
        setIsLoading(true);
        if (cioc) {
          const result = await fetchCountryByCioc(cioc);
          dispatch(setBorderCountries(result));
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
    fetchByCioc();
  }, [apiError, cioc, dispatch]);

  return (
    <div className={scss['container-border-countries']}>
      {isLoading && <Loader />}
      <p className={scss.title}>Border Countries: </p>
      <ul className={scss['list-border-countries']}>
        {borderCountries.map(({ name, flags }) => (
          <li
            className={clsx(scss.country, {
              [scss.dark]: theme,
            })}
            key={flags.png}
          >
            <Link
              className={scss['country-link']}
              state={{ from: location }}
              to={`/country/${name.official}`}
            >
              <p className={scss['country-name']}>{name.common}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorderCountriesList;
