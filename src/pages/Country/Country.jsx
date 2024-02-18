import { fetchCountryByName } from "api/country-api";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom"
import scss from './Country.module.scss'
import { Loader } from "components/Loader/Loader";

const Country = () => {
const {name} = useParams()
const [countryDetails, setCountryDetails] = useState()
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);


useEffect(()=>{
    const fetchByName = async () => {
        try {
          setIsLoading(true);
          const result = await fetchCountryByName(name);
          if (result.length === 0) {
            Notiflix.Notify.failure(
              `Oops! Seems like we do not have movie with title ${name}!`
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
          setIsLoading(false);
        }
      }
      fetchByName()
}, [apiError, name,])
console.log(countryDetails);
    return(
        <div >
            {isLoading && <Loader/>}
{countryDetails &&  <div key={name}>
 {countryDetails.map(({name, region, flags, population, subregion, capital, tld, currencies, languages})=>
                (<section key={name}>
                    <img className={scss.flag} src={flags.png} alt={flags.alt} />
                    <h2>{name.common}</h2>
                    <p>Native Name: {name.nativeName[1]} </p> 
                    <p>Population: {population}</p>
                    <p>Region: {region}  </p>
                    <p>Sub Region: {subregion}</p>
                    <p>Capital: {capital}</p> 
{/*                     {/* <p>Top Level Domain: {tld}</p>
                    <p>Currencies: {currencies}</p> */}
                    {/* <p>Languages: {languages}</p> */} 
                    <p>Border Countries: </p>
                </section>))
            }
 </div>}

        </div>

    )
}

export default Country