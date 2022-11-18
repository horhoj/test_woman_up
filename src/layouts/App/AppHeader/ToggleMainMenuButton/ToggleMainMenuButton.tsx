import { IconButton } from '@components/IconButton';
import { appSlice } from '@store/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { FC } from 'react';
import classNames from 'classnames';
import styles from './ToggleMainMenuButton.module.scss';

export const ToggleMainMenuButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleToggleBtnClk = () => {
    dispatch(appSlice.actions.toggleIsShowMainMenu());
  };

  const isLeftMenuMobileVariant = useAppSelector(
    appSlice.selectors.getIsLeftMenuMobileVariant,
  );

  const isShowMainMenu = useAppSelector(appSlice.selectors.getIsShowMainMenu);

  return (
    <IconButton onClick={handleToggleBtnClk}>
      <span
        className={classNames(
          styles.icon,
          isShowMainMenu && isLeftMenuMobileVariant && styles.iconCross,
        )}
      >
        <span />
        <span />
        <span />
      </span>
    </IconButton>
  );
};
