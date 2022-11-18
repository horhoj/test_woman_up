import { FC } from 'react';
import styles from './AppFooter.module.scss';

export const AppFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return <div className={styles.wrap}>© {currentYear} cool29horhoj.</div>;
};
