import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRedirectUrl } from './types';

export interface InitialState {
  redirectUrl: AppRedirectUrl | null;
  isShowMainMenu: boolean;
  isLeftMenuMobileVariant: boolean;
  isDarkTheme: boolean;
}

const initialState: InitialState = {
  redirectUrl: null,
  isShowMainMenu: false,
  isLeftMenuMobileVariant: true,
  isDarkTheme: false,
};

export const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // в компоненте RedirectExecutor мы отслеживаем изменение
    // redirectUrl и соответственно делаем redirect
    // это нужно что бы не привязывать компоненты к роутеру
    // и была возможность делать переадресацию из redux-middleware
    // без доступа напрямую к HISTORY API
    redirect: (state, action: PayloadAction<string>) => {
      state.redirectUrl = {
        path: action.payload,
      };
    },

    toggleIsShowMainMenu: (state) => {
      state.isShowMainMenu = !state.isShowMainMenu;
    },

    setIsShowMainMenu: (state, action: PayloadAction<boolean>) => {
      state.isShowMainMenu = action.payload;
    },

    setIsLeftMenuMobileVariant: (state, action: PayloadAction<boolean>) => {
      state.isLeftMenuMobileVariant = action.payload;
    },

    setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },

    toggleIsDarkTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },

    hideMobileMenu: (state) => {
      if (state.isLeftMenuMobileVariant) {
        state.isShowMainMenu = false;
      }
    },
  },
});
