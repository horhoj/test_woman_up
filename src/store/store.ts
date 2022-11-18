import { configureStore } from '@reduxjs/toolkit';
import { LS_KEY_IS_DARK_THEME } from './../config/app';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
  },
});

//инициализируем некоторые состояния
{
  const isDarkTheme = localStorage.getItem(LS_KEY_IS_DARK_THEME) === 'true';
  store.dispatch(appSlice.actions.setIsDarkTheme(isDarkTheme));
}
