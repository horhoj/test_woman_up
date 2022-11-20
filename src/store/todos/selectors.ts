import { RootState } from '@store/types';

export const getFetchTodoListRequest = (state: RootState) =>
  state.todos.fetchTodoListRequest;

export const getDoneToggleTodoItemRequest = (state: RootState) =>
  state.todos.doneToggleTodoItemRequest;

export const getDeleteTodoItemRequest = (state: RootState) =>
  state.todos.deleteTodoItemRequest;

export const getFetchTodoItemRequest = (state: RootState) =>
  state.todos.fetchTodoItemRequest;

export const getPatchTodoItemRequest = (state: RootState) =>
  state.todos.patchTodoItemRequest;

export const getAddTodoItemRequest = (state: RootState) =>
  state.todos.addTodoItemRequest;

export const getIsLoading = (state: RootState) =>
  state.todos.fetchTodoListRequest.isLoading ||
  state.todos.fetchTodoItemRequest.isLoading ||
  state.todos.patchTodoItemRequest.isLoading ||
  state.todos.deleteTodoItemRequest.isLoading ||
  state.todos.addTodoItemRequest.isLoading ||
  state.todos.doneToggleTodoItemRequest.isLoading;
