import { RootState } from '../types';
import { AppRedirectUrl } from './types';

export const getRedirectUrl = (state: RootState): AppRedirectUrl | null =>
  state.app.redirectUrl;

export const getIsShowMainMenu = (state: RootState): boolean =>
  state.app.isShowMainMenu;

export const getIsLeftMenuMobileVariant = (state: RootState): boolean =>
  state.app.isLeftMenuMobileVariant;

export const getIsDarkTheme = (state: RootState): boolean =>
  state.app.isDarkTheme;
