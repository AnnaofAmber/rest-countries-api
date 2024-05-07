import scss from './FilterBar.module.scss';
import clsx from 'clsx';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilterByRegion } from '../../redux/filterRegionSlice';
import { setCountries } from '../../redux/countriesSlice';
import { setPage } from '../../redux/paginationSlice';

import { getTheme } from '../../redux/selectors';

export const FilterBar = () => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  // function for handling click on filter option
  const handleChange = event => {
    dispatch(setFilterByRegion(event.target.value));
    dispatch(setCountries([]));
    dispatch(setPage(0));
    setSelectIsOpen(false);
  };
  // function for opening filter bar
  const hadnleClick = selectStatus => setSelectIsOpen(selectStatus);

  return (
    <div
      className={clsx(scss['custom-select'], {
        [scss.active]: selectIsOpen,
        [scss.dark]: theme,
      })}
    >
      <button
        className={scss['select-button']}
        role="combobox"
        aria-label="select"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        onClick={() => hadnleClick(!selectIsOpen)}
      >
        <span className={scss['selected-value']}>Filter by Region</span>
        <span className={scss.arrow}></span>
      </button>
      <ul
        className={scss['select-dropdown']}
        role="listbox"
        id="select-dropdown"
      >
        <li role="option" aria-selected>
          <input
            type="radio"
            id="africa"
            name="regions"
            value="africa"
            onClick={handleChange}
          />
          <label htmlFor="africa">
            <i className={scss['bx bxl-github']}></i>Africa
          </label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="america"
            name="regions"
            value="america"
            onClick={handleChange}
          />
          <label htmlFor="america">
            <i className={scss['bx bxl-instagram']}></i>America
          </label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="asia"
            name="regions"
            value="asia"
            onClick={handleChange}
          />
          <label htmlFor="asia">
            <i className={scss['bx bxl-facebook-circle']}></i>Asia
          </label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="europe"
            name="regions"
            value="europe"
            onClick={handleChange}
          />
          <label htmlFor="europe">
            <i className={scss['bx bxl-linkedin-square']}></i>Europe
          </label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="oceania"
            name="regions"
            value="oceania"
            onClick={handleChange}
          />
          <label htmlFor="oceania">
            <i className={scss['bx bxl-twitter']}></i>Oceania
          </label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="none"
            name="regions"
            value="all"
            onClick={handleChange}
          />
          <label htmlFor="none">
            <i className={scss['bx bxl-twitter']}></i>Clear Selection
          </label>
        </li>
      </ul>
    </div>
  );
};
