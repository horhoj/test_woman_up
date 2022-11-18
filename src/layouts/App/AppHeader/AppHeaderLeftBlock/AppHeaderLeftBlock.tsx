import { FC } from 'react';
import { ToggleMainMenuButton } from '../ToggleMainMenuButton';
import styles from './AppHeaderLeftBlock.module.scss';

export const AppHeaderLeftBlock: FC = () => {
  return (
    <div className={styles.wrap}>
      <ToggleMainMenuButton />
      <div className={styles.logo}>REACT</div>
    </div>
  );
};
