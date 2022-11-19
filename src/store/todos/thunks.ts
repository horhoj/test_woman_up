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

interface AddTodoItemThunkPayload {
  todoBodyItem: TodoBodyItem;
  file: File | null;
}

export const addTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/addTodoItemThunk`,
  async ({ todoBodyItem, file }: AddTodoItemThunkPayload, { dispatch }) => {
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    if (file) {
      fileUrl = await api.todos.addFile(file);
      fileName = file.name;
    }
    await api.todos.addTodo({ ...todoBodyItem, fileUrl, fileName });
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
  },
);

interface PatchTodoItemThunkPayload {
  todoBodyItem: TodoBodyItem;
  id: string;
  file: File | null;
}

export const patchTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/patchTodo`,
  async (
    { todoBodyItem, id, file }: PatchTodoItemThunkPayload,
    { dispatch },
  ) => {
    let fileUrl: string | null = todoBodyItem.fileUrl;
    let fileName: string | null = todoBodyItem.fileName;
    if (file) {
      if (fileUrl) {
        await api.todos.deleteFile(fileUrl);
      }
      fileUrl = await api.todos.addFile(file);
      fileName = file.name;
    }

    await api.todos.patchTodo({ ...todoBodyItem, fileUrl, fileName }, id);
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
    return null;
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
    await api.todos.patchTodo(newTodoBodyItem, todoId);
    dispatch(fetchTodoListThunk());
  },
);

interface DeleteTodoItemThunkPayload {
  todoId: string;
  fileUrl: string | null;
}

export const deleteTodoItemThunk = createAsyncThunk(
  `${SLICE_NAME}/deleteTodoItemThunk`,
  async ({ todoId, fileUrl }: DeleteTodoItemThunkPayload, { dispatch }) => {
    if (fileUrl) {
      await api.todos.deleteFile(fileUrl);
    }
    await api.todos.deleteTodo(todoId);
    dispatch(fetchTodoListThunk());
    return null;
  },
);
