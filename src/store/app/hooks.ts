import { appSlice } from '@store/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect } from 'react';
import { LS_KEY_IS_DARK_THEME } from '@config/app';

export const useApp = (): void => {
  const dispatch = useAppDispatch();

  //определить при ресайзе окна некоторые переменные
  useEffect(() => {
    const resize = () => {
      const { width } = document.body.getBoundingClientRect();

      let isLeftMenuMobileVariant = true;
      let isShowMainMenu = true;

      if (width <= 768) {
        isLeftMenuMobileVariant = true;
        isShowMainMenu = false;
      } else {
        isLeftMenuMobileVariant = false;
        isShowMainMenu = true;
      }
      dispatch(
        appSlice.actions.setIsLeftMenuMobileVariant(isLeftMenuMobileVariant),
      );

      dispatch(appSlice.actions.setIsShowMainMenu(isShowMainMenu));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  //скрыть прокрутку у body при показе меню в мобильном режиме
  const isShowMainMenu = useAppSelector(appSlice.selectors.getIsShowMainMenu);
  const isLeftMenuMobileVariant = useAppSelector(
    appSlice.selectors.getIsLeftMenuMobileVariant,
  );

  useEffect(() => {
    if (isShowMainMenu && isLeftMenuMobileVariant) {
      document.body.classList.add('body-overflow-hidden');
    } else {
      document.body.classList.remove('body-overflow-hidden');
    }
  }, [isShowMainMenu, isLeftMenuMobileVariant]);

  //текущая тема
  const isDarkTheme = useAppSelector(appSlice.selectors.getIsDarkTheme);
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
      localStorage.setItem(LS_KEY_IS_DARK_THEME, String(true));
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem(LS_KEY_IS_DARK_THEME, String(false));
    }
  }, [isDarkTheme]);
};
