export interface TodoBodyItem {
  title: string;
  description: string;
  dateOfCompletion: number;
  done: boolean;
  timestamp: number;
  fileUrl: string | null;
  fileName: string | null;
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
