import { FC } from 'react';
import { AppHeaderLeftBlock } from './AppHeaderLeftBlock';
import { AppHeaderRightBlock } from './AppHeaderRightBlock';
import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
  return (
    <header className={styles.wrap}>
      <AppHeaderLeftBlock />
      <AppHeaderRightBlock />
    </header>
  );
};
