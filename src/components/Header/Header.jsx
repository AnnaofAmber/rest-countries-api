import scss from './Header.module.scss';
import {  NavLink } from 'react-router-dom';
export const Header = () => {
  return (
    <header className={scss.header}>
      <NavLink className={scss.title} to={`/`}>Where in the world?</NavLink>
      <div className={scss['theme-container']}>
        {' '}
        <input className={scss['theme-input-icon']}  type="checkbox" id='theme'/>
        <label className={scss.theme}  htmlFor="theme">Dark Mode</label>
      </div>
    </header>
  );
};
