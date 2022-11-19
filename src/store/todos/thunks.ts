import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@store/todos/types';
import { api } from '@api/index';
import { TodoBodyItem } from '@entitiesTypes/todo';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';

export const fetchTodoListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchTodoListThunk`,
  async () => {
    const response = await api.todos.fetchTodoList();
    return response;
  },
);

interface FetchTodoItemThunkPayload {
  id: string;
}

export const fetchTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchTodoItemThunk`,
  async ({ id }: FetchTodoItemThunkPayload) => {
    const response = await api.todos.fetchTodoItem(id);
    return response;
  },
);

interface PatchTodoItemThunkPayload {
  todoBodyItem: TodoBodyItem;
  id: string;
}

export const patchTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/patchTodo`,
  async ({ todoBodyItem, id }: PatchTodoItemThunkPayload, { dispatch }) => {
    await api.todos.patchTodo(todoBodyItem, id);
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
    return null;
  },
);

interface DeleteTodoItemThunkPayload {
  todoId: string;
}

export const deleteTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/deleteTodoItemThunk`,
  async ({ todoId }: DeleteTodoItemThunkPayload, { dispatch }) => {
    await api.todos.deleteTodo(todoId);
    dispatch(fetchTodoListThunk());
    return null;
  },
);

interface AddTodoItemThunkPayload {
  todoBodyItem: TodoBodyItem;
}

export const addTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/addTodoItemThunk`,
  async ({ todoBodyItem }: AddTodoItemThunkPayload, { dispatch }) => {
    await api.todos.addTodo(todoBodyItem);
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
  },
);

interface TodoItemDoneToggleThunkPayload {
  todoId: string;
  newTodoBodyItem: TodoBodyItem;
}

export const todoItemDoneToggleThunk = createAsyncThunk(
  `${SLICE_NAME}/todoItemDoneToggleThunk`,
  async (
    { todoId, newTodoBodyItem }: TodoItemDoneToggleThunkPayload,
    { dispatch },
  ) => {
    // console.log('todoItemDoneToggleThunk', todoId, newTodoBodyItem);
    await api.todos.patchTodo(newTodoBodyItem, todoId);
    dispatch(fetchTodoListThunk());
  },
);
