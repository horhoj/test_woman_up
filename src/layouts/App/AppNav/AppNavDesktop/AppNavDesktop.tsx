import { appSlice } from '@store/app';
import { useAppSelector } from '@store/hooks';
import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AppNavData } from '../AppNavData';
import styles from './AppNavDesktop.module.scss';

export const AppNavDesktop: FC = () => {
  const isSHowMainMenu = useAppSelector(appSlice.selectors.getIsShowMainMenu);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isSHowMainMenu}
      nodeRef={ref}
      timeout={300}
      unmountOnExit
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div className={styles.wrap} ref={ref}>
        <AppNavData />
      </div>
    </CSSTransition>
  );
};
