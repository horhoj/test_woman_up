import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { todosSlice } from '@store/todos';
import { TodoItemForm } from '@components/TodoItemForm';
import { TodoBodyItem, TodoItemFormValues } from '@entitiesTypes/todo';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';
import { getTodoItemFormValues } from '@helpers/todoListHelpers';
import styles from './TodoEditPage.module.scss';

export const TodoEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const fetchTodoItemRequest = useAppSelector(
    todosSlice.selectors.getFetchTodoItemRequest,
  );

  useEffect(() => {
    if (id) {
      dispatch(todosSlice.thunks.fetchTodoItemThunk({ id }));
    }
  }, [id]);

  useEffect(
    () => () => {
      dispatch(todosSlice.actions.todoItemEditPageUnmount());
    },
    [],
  );

  const handleCancel = () => {
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleSubmit = (values: TodoItemFormValues, file: File | null) => {
    console.log(file);
    if (!fetchTodoItemRequest.data) {
      return;
    }

    const todoBodyItem: TodoBodyItem = {
      ...fetchTodoItemRequest.data.body,
      description: values.description,
      title: values.title,
      dateOfCompletion: new Date(values.dateOfCompletion).getTime(),
      timestamp: new Date().getTime(),
    };

    dispatch(
      todosSlice.thunks.patchTodoItemThunk({
        todoBodyItem,
        id: fetchTodoItemRequest.data.id,
        file,
      }),
    );
  };

  return (
    <div className={styles.wrap}>
      {fetchTodoItemRequest.data && (
        <TodoItemForm
          initialValues={getTodoItemFormValues(fetchTodoItemRequest.data.body)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          formTitle={'Изменения дела'}
          fileUrl={fetchTodoItemRequest.data.body.fileUrl}
          fileName={fetchTodoItemRequest.data.body.fileName}
        />
      )}
    </div>
  );
};
