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

let nativeNameOfficial
let currencies
let languages = []

useEffect(()=>{
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
          setIsLoading(false);
        }
      }
      fetchByName()
}, [apiError, name,])
console.log(countryDetails);
if(countryDetails){
  for(const key in countryDetails[0].name.nativeName){
    nativeNameOfficial = countryDetails[0].name.nativeName[key].official
  }
  for(const key in countryDetails[0].currencies){
    currencies = countryDetails[0].currencies[key].name
  }
  for(const key in countryDetails[0].languages){
    languages.push(countryDetails[0].languages[key])
    console.log(languages);
  }

}
    return(
        <div >
            {isLoading && <Loader/>}
{countryDetails &&  <div key={name}>
 {countryDetails.map(({name, region, flags, population, subregion, capital, tld})=>
 
                (

                <section key={name}>
                    <img className={scss.flag} src={flags.png} alt={flags.alt} />
                    <h2>{name.common}</h2>
                    <p>Native Name: {nativeNameOfficial} </p> 
                    <p>Population: {population.toLocaleString('en-En')}</p>
                    <p>Region: {region}  </p>
                    <p>Sub Region: {subregion}</p>
                    {capital?<p>Capital: {capital}</p>: <p>Capital: None</p> }
               <p>Top Level Domain: {tld}</p>
                     <p>Currencies: {currencies}</p>
                    <p>Languages: { languages.join(', ')}</p> 
                    <p>Border Countries: </p>
                </section>))
            }
 </div>}

        </div>

    )
}

export default Country