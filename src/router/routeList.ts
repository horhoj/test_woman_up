import { Page404 } from '@pages/Error404Page';
import { FC } from 'react';
import { AboutPage } from '@pages/AboutPage';
import { TodoList } from '@pages/TodoList';
import { TodoEditPage } from '@pages/TodoEditPage';
import { TodoAddPage } from '@pages/TodoAddPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = [
  'todoList',
  'todoEdit',
  'todoAdd',
  'about',
  'error404',
] as const;

export type RouteNameList = typeof routeNameList[number];

export const routeList: Record<RouteNameList, RouteItem> = {
  todoList: {
    path: '/',
    component: TodoList,
  },

  todoEdit: { path: '/todo-edit/:id', component: TodoEditPage },

  todoAdd: { path: 'todo-add', component: TodoAddPage },

  about: {
    path: '/about',
    component: AboutPage,
  },

  error404: {
    path: '*',
    component: Page404,
  },
};
