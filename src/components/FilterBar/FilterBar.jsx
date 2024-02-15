import scss from './FilterBar.module.scss'
import { useDispatch } from 'react-redux';
import { setFilterByRegion } from '../../redux/filterRegionSlice';
import { setCountries } from '../../redux/countriesSlice';


export const FilterBar = () =>{
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(setFilterByRegion(event.target.value))
        dispatch(setCountries([]))
    };


 return(
    <div className={scss['filter-container']}>
    <select id="" onChange={handleChange}>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
    </select>
</div>
 )
}