import { useEffect, useState } from 'react'
import scss from './BorderCountriesList.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { getBorderCountries } from "../../redux/selectors"
import { setBorderCountries } from '../../redux/borderCountriesSlice'
import { fetchCountryByCioc } from 'api/country-api'
import Notiflix from 'notiflix'
import { Link } from 'react-router-dom'
import { Loader } from 'components/Loader/Loader'



const BorderCountriesList = ({cioc, location})=>{
console.log(cioc);
const borderCountries = useSelector(getBorderCountries)
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);
const dispatch = useDispatch()



useEffect(()=>{
    const fetchByCioc = async ()=>{
        try{
          setIsLoading(true);
          if (cioc) {
            
  const result = await fetchCountryByCioc(cioc)
  console.log(result);
      dispatch(setBorderCountries(result));
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
      fetchByCioc()
},[apiError, cioc,dispatch])

return(
<div className={scss['container-border-countries']}>
{isLoading && <Loader/>}
                  <p className={scss.title}>Border Countries: </p>
                 <ul className={scss['list-border-countries']}>
                   {
borderCountries.map(({name, flags})=>(
  <li className={scss.country} key={flags.png}>
    <Link state={{from: location}} to={`/country/${name.official}`}>
        <p>{name.common}</p>
    </Link>
  </li>
))}
                   
                  </ul>
                </div>
)
}

export default BorderCountriesList