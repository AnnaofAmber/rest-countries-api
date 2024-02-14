import { ColorRing } from 'react-loader-spinner';
import scss from './Loader.module.scss';


export const Loader = () => {
  return (
    <div className={scss.loaderWrapper}>
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};
