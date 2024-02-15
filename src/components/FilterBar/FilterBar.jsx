import scss from './FilterBar.module.scss'
import { useDispatch } from 'react-redux';
import { setFilterByRegion } from '../../redux/filterRegionSlice';
import { setCountries } from '../../redux/countriesSlice';
import { useState } from 'react';
import clsx from 'clsx';


export const FilterBar = () =>{
    const [selectIsOpen, setSelectIsOpen]= useState(false)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(setFilterByRegion(event.target.value))
        dispatch(setCountries([]))
    };
    const hadnleClick = selectStatus => setSelectIsOpen(selectStatus)

 return(
//     <div className={scss['filter-container']}>
// <select className={scss['select-container']} onChange={handleChange}>
// <option value="">Filter by Region</option>
//         <option className={scss.option} value="africa">Africa</option>
//         <option className={scss.option} value="america">America</option>
//         <option className={scss.option} value="asia">Asia</option>
//         <option className={scss.option} value="europe">Europe</option>
//         <option className={scss.option} value="oceania">Oceania</option>
//     </select>
// </div>
<div className={clsx(scss["custom-select"],{
    [scss.active]:selectIsOpen
})}>
  <button
    className={scss["select-button"]}
    role="combobox"
    aria-labelledby="select button"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="select-dropdown"
    onClick={()=>hadnleClick(!selectIsOpen)}
  >
    <span className={scss["selected-value"]}>Filter by Region</span>
    <span className={scss.arrow}></span>
  </button>
  <ul className={scss["select-dropdown"]} role="listbox" id="select-dropdown">
    <li role="option" aria-selected>
      <input type="radio" id="github" name="social-account" />
      <label htmlFor="github"><i className={scss["bx bxl-github"]}></i>GitHub</label>
    </li>
    <li role="option" aria-selected>
      <input type="radio" id="instagram" name="social-account" />
      <label htmlFor="instagram"
        ><i className={scss["bx bxl-instagram"]}></i>Instagram</label
      >
    </li>
    <li role="option" aria-selected>
      <input type="radio" id="facebook" name="social-account" />
      <label htmlFor="facebook"
        ><i className={scss["bx bxl-facebook-circle"]}></i>Facebook</label
      >
    </li>
    <li role="option" aria-selected>
      <input type="radio" id="linkedIn" name="social-account" />
      <label htmlFor="linkedIn"
        ><i className={scss["bx bxl-linkedin-square"]}></i>LinkedIn</label
      >
    </li>
    <li role="option" aria-selected>
      <input type="radio" id="twitter" name="social-account" />
      <label htmlFor="twitter"><i className={scss["bx bxl-twitter"]}></i>Twitter</label>
    </li>

  </ul>
</div> 

 )
}