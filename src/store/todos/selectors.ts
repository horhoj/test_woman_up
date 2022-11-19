import { RootState } from '@store/types';

export const getFetchTodoListRequest = (state: RootState) =>
  state.todos.fetchTodoListRequest;

export const getFetchTodoItemRequest = (state: RootState) =>
  state.todos.fetchTodoItemRequest;

export const getIsLoading = (state: RootState) =>
  state.todos.fetchTodoListRequest.isLoading ||
  state.todos.fetchTodoItemRequest.isLoading ||
  state.todos.patchTodoItemRequest.isLoading ||
  state.todos.deleteTodoItemRequest.isLoading ||
  state.todos.addTodoItemRequest.isLoading ||
  state.todos.doneToggleTodoItemRequest.isLoading;
