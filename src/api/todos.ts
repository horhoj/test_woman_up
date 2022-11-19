import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  DocumentData,
  QuerySnapshot,
  where,
  documentId,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore/lite';

import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { TodoBodyItem, TodoItem } from '@entitiesTypes/todo';
import { getUUID } from '@utils/getUUID';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyC5-LKi2VTj93Ia5WMrtKyfogaY_bGgmo4',
  projectId: 'todoproject-36ef9',
  storageBucket: 'todoproject-36ef9.appspot.com',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

const todoListDataTransform = (todosSnapshot: QuerySnapshot<DocumentData>) =>
  todosSnapshot.docs.map((doc) => ({
    body: doc.data() as TodoBodyItem,
    id: doc.id,
  }));

export const fetchTodoList = async (): Promise<TodoItem[]> => {
  const todosCol = collection(db, 'todos');
  const todosSnapshot = await getDocs(todosCol);
  const todoList: TodoItem[] = todoListDataTransform(todosSnapshot);
  return todoList;
};

export const fetchTodoItem = async (id: string): Promise<TodoItem> => {
  const todosCol = collection(db, 'todos');
  const q = query(todosCol, where(documentId(), '==', id));
  const todosSnapshot = await getDocs(q);

  const todoList: TodoItem[] | undefined = todoListDataTransform(todosSnapshot);

  if (!todoList) {
    throw new Error('Not found!');
  }

  const todoItem: TodoItem | undefined = todoList[0];

  if (!todoList || !todoItem) {
    throw new Error('incorrect id!');
  }

  return todoItem;
};

export const addTodo = async (todoBody: TodoBodyItem): Promise<void> => {
  const todosCol = collection(db, 'todos');
  await addDoc(todosCol, todoBody);
};

export const patchTodo = async (
  todoBody: TodoBodyItem,
  id: string,
): Promise<void> => {
  const docRef = doc(db, 'todos', id);
  await updateDoc(docRef, { ...todoBody });
};

export const deleteTodo = async (id: string) => {
  const docRef = doc(db, 'todos', id);
  await deleteDoc(docRef);
};

export const addFile = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `${getUUID()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const percent = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        // );
        //
        // // update progress
        // setPercent(percent);
      },
      (err) => reject(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          resolve(url);
        });
      },
    );
  });
};

export const deleteFile = async (fileUrl: string) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (e) {
    // Возможна ситуация когда файл уже как бы удален,
    // но однако это не повод бросать исключение,
    // так как мы его все равно пытаемся удалить
    // но в консоль для порядка напишем

    // eslint-disable-next-line no-console
    console.log('error delete file', JSON.stringify(e, null, 2));
  }
};
