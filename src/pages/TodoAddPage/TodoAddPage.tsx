import { FC, useEffect } from 'react';
import { TodoItemForm } from '@components/TodoItemForm';
import { TodoBodyItem, TodoItemFormValues } from '@entitiesTypes/todo';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { todosSlice } from '@store/todos';
import { getDate } from '@utils/dateTime';
import { RequestErrorView } from '@components/RequestErrorView';
import styles from './TodoAddPage.module.scss';

const INITIAL_VALUES: TodoItemFormValues = {
  title: '',
  dateOfCompletion: getDate(new Date().getTime()),
  description: '',
};

export const TodoAddPage: FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(todosSlice.selectors.getIsLoading);

  const addTodoItemRequest = useAppSelector(
    todosSlice.selectors.getAddTodoItemRequest,
  );

  useEffect(
    () => () => {
      dispatch(todosSlice.actions.todoItemAddPageUnmount());
    },
    [],
  );

  const handleCancel = () => {
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleSubmit = (values: TodoItemFormValues, file: File | null) => {
    const todoBodyItem: TodoBodyItem = {
      title: values.title,
      description: values.description,
      done: false,
      dateOfCompletion: new Date(values.dateOfCompletion).getTime(),
      timestamp: new Date().getTime(),
      fileUrl: null,
      fileName: null,
    };

    dispatch(todosSlice.thunks.addTodoItemThunk({ todoBodyItem, file }));
  };

  return (
    <div className={styles.wrap}>
      {addTodoItemRequest.error && (
        <RequestErrorView
          errorTitle={'Ошибка добавления нового дела'}
          requestError={addTodoItemRequest.error}
        />
      )}

      <TodoItemForm
        formTitle={'Добавление дела'}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={INITIAL_VALUES}
        fileName={null}
        fileUrl={null}
        disabled={isLoading}
      />
    </div>
  );
};
