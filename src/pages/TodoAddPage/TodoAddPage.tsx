import { FC } from 'react';
import { TodoItemForm } from '@components/TodoItemForm';
import { TodoBodyItem, TodoItemFormValues } from '@entitiesTypes/todo';
import { getRoutePath } from '@router/helpers';
import { appSlice } from '@store/app';
import { useAppDispatch } from '@store/hooks';
import { todosSlice } from '@store/todos';
import { getDate } from '@utils/dateTime';
import styles from './TodoAddPage.module.scss';

const INITIAL_VALUES: TodoItemFormValues = {
  title: '',
  dateOfCompletion: getDate(new Date().getTime()),
  description: '',
};

export const TodoAddPage: FC = () => {
  const handleSubmit = (values: TodoItemFormValues, file: File | null) => {
    console.log(file, file?.name);
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

  const dispatch = useAppDispatch();

  const handleCancel = () => {
    const path = getRoutePath('todoList');
    dispatch(appSlice.actions.redirect(path));
  };

  return (
    <div className={styles.wrap}>
      <TodoItemForm
        formTitle={'Добавление дела'}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={INITIAL_VALUES}
        fileName={null}
        fileUrl={null}
      />
    </div>
  );
};
