import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { todosSlice } from '@store/todos';
import { TodoListView } from '@components/TodoListView';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';
import { Button } from '@components/Button';
import { TodoBodyItem } from '@entitiesTypes/todo';
import { RequestErrorView } from '@components/RequestErrorView';
import styles from './TodoList.module.scss';

export const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const fetchListRequest = useAppSelector(
    todosSlice.selectors.getFetchTodoListRequest,
  );

  const doneToggleTodoItemRequest = useAppSelector(
    todosSlice.selectors.getDoneToggleTodoItemRequest,
  );

  const deleteTodoItemRequest = useAppSelector(
    todosSlice.selectors.getDeleteTodoItemRequest,
  );

  useEffect(() => {
    dispatch(todosSlice.thunks.fetchTodoListThunk());
  }, []);

  const isLoading = useAppSelector(todosSlice.selectors.getIsLoading);

  const handleTodoEdit = (todoId: string) => {
    const path = getRoutePath('todoEdit', todoId);
    dispatch(appSlice.actions.redirect(path));
  };

  const handleTodoDelete = (todoId: string, fileUrl: string | null) => {
    if (confirm('Delete?')) {
      dispatch(todosSlice.thunks.deleteTodoItemThunk({ todoId, fileUrl }));
    }
  };

  const handleTodoAdd = () => {
    const path = getRoutePath('todoAdd');
    dispatch(appSlice.actions.redirect(path));
  };

  const handleDoneToggle = (todoId: string, newTodoBodyItem: TodoBodyItem) => {
    dispatch(
      todosSlice.thunks.todoItemDoneToggleThunk({ newTodoBodyItem, todoId }),
    );
  };

  return (
    <div className={styles.wrap}>
      <div>
        <Button onClick={handleTodoAdd} disabled={isLoading}>
          Добавить задачу
        </Button>
      </div>
      {fetchListRequest.error && (
        <RequestErrorView
          requestError={fetchListRequest.error}
          errorTitle={'Ошибка получения списка дел'}
        />
      )}
      {doneToggleTodoItemRequest.error && (
        <RequestErrorView
          requestError={doneToggleTodoItemRequest.error}
          errorTitle={'Ошибка переключения статуса дела'}
        />
      )}

      {deleteTodoItemRequest.error && (
        <RequestErrorView
          requestError={deleteTodoItemRequest.error}
          errorTitle={'Ошибка удаления дела'}
        />
      )}
      {fetchListRequest.data && (
        <TodoListView
          todoItemList={fetchListRequest.data}
          onEdit={handleTodoEdit}
          onDelete={handleTodoDelete}
          onDoneToggle={handleDoneToggle}
          disabled={isLoading}
        />
      )}
    </div>
  );
};
