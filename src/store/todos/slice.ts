import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@store/todos/types';
import { RequestSliceStateProperty } from '@store/types';
import { TodoItem } from '@entitiesTypes/todo';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '@store/helpers';
import * as thunks from './thunks';

interface InitialState {
  fetchTodoListRequest: RequestSliceStateProperty<TodoItem[]>;
  fetchTodoItemRequest: RequestSliceStateProperty<TodoItem>;
  patchTodoItemRequest: RequestSliceStateProperty<unknown>;
  deleteTodoItemRequest: RequestSliceStateProperty<unknown>;
  addTodoItemRequest: RequestSliceStateProperty<unknown>;
  doneToggleTodoItemRequest: RequestSliceStateProperty<unknown>;
}

const initialState: InitialState = {
  fetchTodoListRequest: makeRequestSliceStateProperty<TodoItem[]>(),
  fetchTodoItemRequest: makeRequestSliceStateProperty<TodoItem>(),
  patchTodoItemRequest: makeRequestSliceStateProperty<unknown>(),
  deleteTodoItemRequest: makeRequestSliceStateProperty<unknown>(),
  addTodoItemRequest: makeRequestSliceStateProperty<unknown>(),
  doneToggleTodoItemRequest: makeRequestSliceStateProperty<unknown>(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    todoItemEditPageUnmount: (state) => {
      state.fetchTodoItemRequest.error = null;
      state.fetchTodoItemRequest.data = null;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchTodoListThunk,
      'fetchTodoListRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchTodoItemThunk,
      'fetchTodoItemRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.patchTodoItemThunk,
      'patchTodoItemRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.deleteTodoItemThunk,
      'deleteTodoItemRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.addTodoItemThunk,
      'addTodoItemRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.todoItemDoneToggleThunk,
      'doneToggleTodoItemRequest',
    );
  },
});
