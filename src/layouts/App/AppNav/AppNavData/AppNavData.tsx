import { FC, SyntheticEvent } from 'react';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';
import { useAppDispatch } from '@store/hooks';
import { AppNavDataLink } from '../AppNavDataLink';
import styles from './AppNavData.module.scss';

export const AppNavData: FC = () => {
  const dispatch = useAppDispatch();

  const handleCloseMobileNavIfLinkOrButtonIsClicked = (
    e: SyntheticEvent<HTMLElement>,
  ) => {
    // console.log((e.target as HTMLElement).tagName);
    const tagName = (e.target as HTMLElement).tagName;
    if (tagName === 'A' || tagName === 'BUTTON') {
      dispatch(appSlice.actions.hideMobileMenu());
    }
  };

  return (
    <nav className={styles.wrap}>
      <ul
        className={styles.ul}
        onClick={handleCloseMobileNavIfLinkOrButtonIsClicked}
      >
        <li>
          <AppNavDataLink link={getRoutePath('main')} text={'Main'} />
        </li>
        <li>
          <AppNavDataLink link={getRoutePath('about')} text={'About'} />
        </li>
        <li>
          <AppNavDataLink
            text={'Exit'}
            onClick={() => {
              alert('click on Exit');
            }}
          />
        </li>
      </ul>
    </nav>
  );
};
