import scss from './Header.module.scss';
import { ReactComponent as Theme } from '../../images/icons/theme.svg';
export const Header = () => {
  return (
    <header className={scss.header}>
      <h1 className={scss.title}>Where in the world?</h1>
      <div className={scss['theme-container']}>
        {' '}
        <Theme className={scss['theme-icon']}/>
        <p className={scss.theme}>Dark Mode</p>
      </div>
    </header>
  );
};
