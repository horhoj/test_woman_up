import { FC } from 'react';
import { TodoBodyItem, TodoItem } from '@entitiesTypes/todo';
import { Button } from '@components/Button';
import { startOfToday } from 'date-fns';
import classNames from 'classnames';
import styles from './TodoListView.module.scss';

interface TodoListViewProps {
  todoItemList: TodoItem[];
  onEdit: (todoId: string) => void;
  onDelete: (todoId: string, fileUrl: string | null) => void;
  onDoneToggle: (todoId: string, newTodoBodyItem: TodoBodyItem) => void;
  disabled: boolean;
}

export const TodoListView: FC<TodoListViewProps> = ({
  todoItemList,
  onEdit,
  onDelete,
  onDoneToggle,
  disabled,
}) => {
  const sortTodoItemList = [...todoItemList].sort(
    (a, b) => b.body.timestamp - a.body.timestamp,
  );

  return (
    <div className={styles.wrap}>
      {sortTodoItemList.map((todoItem) => {
        const timestamp = new Date(todoItem.body.timestamp).toLocaleString();
        const dateOfCompletion = new Date(
          todoItem.body.dateOfCompletion,
        ).toLocaleDateString();
        const startOfTodayTimestamp = startOfToday().getTime();
        const isOverdue =
          todoItem.body.dateOfCompletion < startOfTodayTimestamp;

        return (
          <div key={todoItem.id} className={styles.todoItemWrap}>
            <div className={styles.todoItemHeaderWrap}>
              <div className={styles.todoItemButtonList}>
                <Button
                  onClick={() =>
                    onDoneToggle(todoItem.id, {
                      ...todoItem.body,
                      done: !todoItem.body.done,
                    })
                  }
                  className={classNames(
                    todoItem.body.done && styles.todoItemIsDone,
                  )}
                  disabled={disabled}
                >
                  {todoItem.body.done ? 'Завершено' : 'Завершить'}
                </Button>
                <Button onClick={() => onEdit(todoItem.id)} disabled={disabled}>
                  Изменить
                </Button>
                <Button
                  onClick={() => onDelete(todoItem.id, todoItem.body.fileUrl)}
                  disabled={disabled}
                >
                  Удалить
                </Button>
              </div>
            </div>
            <div className={styles.todoItemTitle}>{todoItem.body.title}</div>
            <div className={styles.todoItemTimeBlockWrap}>
              <div
                className={classNames(
                  styles.todoItemDeadline,
                  isOverdue &&
                    !todoItem.body.done &&
                    styles.todoItemDeadlineIsOverdue,
                )}
              >
                <div>Крайний срок:</div>
                <div>{dateOfCompletion}</div>
              </div>
              <div className={styles.todoItemUpdatedWrap}>
                <div>Обновлено: </div> <div>{timestamp}</div>
              </div>
            </div>
            <div className={styles.todoItemDescription}>
              {todoItem.body.description}
            </div>
            {todoItem.body.fileUrl && todoItem.body.fileName ? (
              <div>
                <span>Вложенный файл: </span>
                <a
                  href={todoItem.body.fileUrl}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {todoItem.body.fileName}
                </a>
              </div>
            ) : (
              <div>нет вложенного файла</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
