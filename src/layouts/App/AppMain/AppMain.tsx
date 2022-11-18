import { Router } from '@router/router';
import { FC } from 'react';
import styles from './AppMain.module.scss';

export const AppMain: FC = () => {
  return (
    <main className={styles.wrap}>
      <Router />
    </main>
  );
};
