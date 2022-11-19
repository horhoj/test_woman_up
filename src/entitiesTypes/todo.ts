export interface TodoBodyItem {
  title: string;
  description: string;
  dateOfCompletion: number;
  done: boolean;
  timestamp: number;
}

export interface TodoItem {
  body: TodoBodyItem;
  id: string;
}

export interface TodoItemFormValues {
  title: string;
  description: string;
  dateOfCompletion: string;
}
