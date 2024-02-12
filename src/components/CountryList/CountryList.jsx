import { Link } from 'react-router-dom';
export const CountryList = ({data})=>{
   
    return(
        <ul>
            {data.map(({name, capital, population, region, flags})=>(
                <li key={flags.png}>

<img src={flags.png} alt={flags.alt} />
                    <p>{name.common}</p>
                    <p>Population: {population}</p>
                    <p>Region: {region}</p>
                    <p>Capital: {capital}</p>
                </li>
            ))}
        </ul>
    )
}