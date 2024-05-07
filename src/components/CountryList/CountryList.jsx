import scss from './CountryList.module.scss';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTheme } from '../../redux/selectors';

export const CountryList = ({ data, location }) => {
  const theme = useSelector(getTheme);

  return (
    <ul
      className={clsx(scss.list, {
        [scss.dark]: theme,
      })}
    >
      {data.map(({ name, capital, population, region, flags }) => (
        <li className={scss.item} key={flags.png}>
          <Link
            className={scss['country-link']}
            state={{ from: location }}
            to={`/country/${name.official}`}
          >
            <img className={scss.flag} src={flags.png} alt={flags.alt} />
            <div className={scss['info-container']}>
              <h2 className={scss.name}>{name.official}</h2>
              <p className={scss.info}>
                Population:
                <span className={scss.details}>
                  {' '}
                  {population.toLocaleString('en-US')}
                </span>
              </p>
              <p className={scss.info}>
                Region: <span className={scss.details}>{region}</span>
              </p>
              <p className={scss.info}>
                Capital: <span className={scss.details}>{capital}</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
