import { Link } from 'react-router-dom';
import scss from './CountryList.module.scss';
export const CountryList = ({ data, location }) => {
  return (
    <ul className={scss.list}>
      {data.map(({ name, capital, population, region, flags }) => (
        <li className={scss.item} key={flags.png}>
          <Link state={{from: location}} to={`/country/${name.common}`}>
            <img className={scss.flag} src={flags.png} alt={flags.alt} />
            <div className={scss['info-container']}>
              <h2 className={scss.name}>{name.common}</h2>
              <p className={scss.info}>
                Population:<span className={scss.details}> {population}</span>
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
