import { Page404 } from '@pages/Error404Page';
import { MainPage } from '@pages/MainPage';
import { FC } from 'react';
import { AboutPage } from '@pages/AboutPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['main', 'about', 'error404'] as const;

export type RouteNameList = typeof routeNameList[number];

export const routeList: Record<RouteNameList, RouteItem> = {
  main: {
    path: '/',
    component: MainPage,
  },
  about: {
    path: '/about',
    component: AboutPage,
  },
  error404: {
    path: '*',
    component: Page404,
  },
};
