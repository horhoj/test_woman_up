import { IconButton } from '@components/IconButton';
import { appSlice } from '@store/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { FC } from 'react';
import styles from './AppHeaderRightBlock.module.scss';

export const AppHeaderRightBlock: FC = () => {
  const dispatch = useAppDispatch();

  const isDarkTheme = useAppSelector(appSlice.selectors.getIsDarkTheme);

  const handleToggleDarkTheme = () => {
    dispatch(appSlice.actions.toggleIsDarkTheme());
  };

  return (
    <div className={styles.wrap}>
      <IconButton
        onClick={handleToggleDarkTheme}
        className={styles.themeToggleIconButton}
      >
        <span className={styles.text}>
          {isDarkTheme ? 'Светлая' : 'Темная'}
        </span>
      </IconButton>
    </div>
  );
};
