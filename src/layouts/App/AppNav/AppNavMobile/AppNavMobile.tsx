import { Portal } from '@components/Portal';
import { AppHeaderLeftBlock } from '@layouts/App/AppHeader/AppHeaderLeftBlock';
import { appSlice } from '@store/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AppNavData } from '../AppNavData';
import styles from './AppNavMobile.module.scss';

export const AppNavMobile: FC = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const isShowMainMenu = useAppSelector(appSlice.selectors.getIsShowMainMenu);

  const handleWrapClk = () => {
    dispatch(appSlice.actions.setIsShowMainMenu(false));
  };

  return (
    <Portal>
      <CSSTransition
        in={isShowMainMenu}
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
        <div className={styles.wrap} ref={ref} onClick={handleWrapClk}>
          <div className={styles.dataWrap} onClick={(e) => e.stopPropagation()}>
            <div className={styles.appHeaderLeftBlockWrap}>
              <AppHeaderLeftBlock />
            </div>
            <AppNavData />
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};
