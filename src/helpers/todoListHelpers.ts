import { TodoBodyItem, TodoItemFormValues } from '@entitiesTypes/todo';
import { getDate } from '@utils/dateTime';

export const getTodoItemFormValues = (
  todoBodyItem: TodoBodyItem,
): TodoItemFormValues => {
  return {
    title: todoBodyItem.title,
    dateOfCompletion: getDate(todoBodyItem.dateOfCompletion),
    description: todoBodyItem.description,
  };
};
