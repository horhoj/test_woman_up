import { FC } from 'react';
import { useAppSelector } from '@store/hooks';
import { appSlice } from '@store/app';
import { AppNavDesktop } from './AppNavDesktop';

import { AppNavMobile } from './AppNavMobile';

export const AppNav: FC = () => {
  const isLeftMenuMobileVariant = useAppSelector(
    appSlice.selectors.getIsLeftMenuMobileVariant,
  );

  return isLeftMenuMobileVariant ? <AppNavMobile /> : <AppNavDesktop />;
};
