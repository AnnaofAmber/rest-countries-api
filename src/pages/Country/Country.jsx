import scss from './Country.module.scss';
import clsx from 'clsx';
import Notiflix from 'notiflix';

import { Loader } from 'components/Loader/Loader';
import BorderCountriesList from 'components/BorderCountriesList/BorderCountriesList';

import { ReactComponent as Arrow } from '../../images/icons/arrowBack.svg';
import { ReactComponent as ArrowWhite } from '../../images/icons/arrowBackWhite.svg';

import { fetchCountryByName } from 'api/country-api';

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTheme } from '../../redux/selectors';

const Country = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [countryDetails, setCountryDetails] = useState();

  const dispatch = useDispatch();

  const theme = useSelector(getTheme);

  const { name } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  let nativeNameOfficial;
  let currencies;
  let languages = [];
  let cioc;

  useEffect(() => {
    /**
      |============================
      | fetch for detailed info about specific country
      |============================
    */
    const fetchByName = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCountryByName(name);
        if (result.length === 0) {
          Notiflix.Notify.failure(
            `Oops! Seems like we do not have country with a name ${name}!`
          );
        } else {
          setCountryDetails(result);
        }
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
    fetchByName();
  }, [apiError, name, cioc, dispatch]);

  /**
    |============================
    | iterating objects in array for getting needed info
    |============================
  */

  if (countryDetails) {
    for (const key in countryDetails[0].name.nativeName) {
      nativeNameOfficial = countryDetails[0].name.nativeName[key].official;
    }
    for (const key in countryDetails[0].currencies) {
      currencies = countryDetails[0].currencies[key].name;
    }
    for (const key in countryDetails[0].languages) {
      languages.push(countryDetails[0].languages[key]);
    }
    if (countryDetails[0].borders) {
      cioc = countryDetails[0].borders;
    }
  }

  return (
    <div
      className={clsx(scss.container, {
        [scss.dark]: theme,
      })}
    >
      <Link className={scss['link-back']} to={backLinkHref.current}>
        {theme ? <ArrowWhite /> : <Arrow />}Back
      </Link>
      {isLoading && <Loader />}
      {countryDetails && (
        <div key={name}>
          {countryDetails.map(
            ({ name, region, flags, population, subregion, capital, tld }) => (
              <section key={name} className={scss['section-country']}>
                <img
                  className={scss['country-flag']}
                  src={flags.png}
                  alt={flags.alt}
                />
                <div>
                  <h2 className={scss['country-name']}>{name.common}</h2>
                  <div className={scss['container-info']}>
                    <div className={scss['country-info-main']}>
                      <p>
                        Native Name:{' '}
                        <span className={scss['country-info']}>
                          {nativeNameOfficial}
                        </span>{' '}
                      </p>
                      <p>
                        Population:{' '}
                        <span className={scss['country-info']}>
                          {population.toLocaleString('en-En')}
                        </span>
                      </p>
                      <p>
                        Region:{' '}
                        <span className={scss['country-info']}>{region}</span>{' '}
                      </p>
                      <p>
                        Sub Region:{' '}
                        <span className={scss['country-info']}>
                          {subregion}
                        </span>
                      </p>
                      {capital ? (
                        <p>
                          Capital:{' '}
                          <span className={scss['country-info']}>
                            {capital}
                          </span>
                        </p>
                      ) : (
                        <p>
                          Capital:{' '}
                          <span className={scss['country-info']}>None</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <p>
                        Top Level Domain:{' '}
                        <span className={scss['country-info']}>{tld}</span>
                      </p>
                      <p>
                        Currencies:{' '}
                        <span className={scss['country-info']}>
                          {currencies}
                        </span>
                      </p>
                      <p>
                        Languages:{' '}
                        <span className={scss['country-info']}>
                          {languages.join(', ')}
                        </span>
                      </p>
                    </div>
                  </div>
                  {cioc && <BorderCountriesList cioc={cioc} />}
                </div>
              </section>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Country;
