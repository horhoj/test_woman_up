import { useFormik } from 'formik';
import { FC, useRef } from 'react';
import * as yup from 'yup';
import { TextArea } from '@components/TextArea';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { TodoItemFormValues } from '@entitiesTypes/todo';
import styles from './TodoItemForm.module.scss';

interface TodoItemFormProps {
  initialValues: TodoItemFormValues;
  onSubmit(values: TodoItemFormValues, file: File | null): void;
  onCancel(): void;
  formTitle: string;
  fileUrl: string | null;
  fileName: string | null;
  disabled: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required('Не должно быть пустым!'),
  description: yup.string().required('Не должно быть пустым!'),
  dateOfCompletion: yup.string().required('Должно быть датой!!!'),
});

const MAX_FILE_SIZE = 1024 * 1024 * 5; //5 мегабайт

export const TodoItemForm: FC<TodoItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  formTitle,
  fileUrl,
  fileName,
  disabled,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      let file: File | null = null;
      if (fileInputRef.current && fileInputRef.current.files) {
        const currentFile = fileInputRef.current.files[0];
        if (currentFile) {
          file = currentFile;
          if (file.size > MAX_FILE_SIZE) {
            alert('Размер прикрепленного файла превышает 5 мегабайт!');
            return;
          }
        }
      }
      onSubmit(values, file);
    },
    validationSchema,
    enableReinitialize: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.wrap}>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete={'off'}
        className={styles.wrap}
      >
        <div className={styles.formTitle}>{formTitle}</div>
        <div className={styles.field}>
          <label>Название</label>
          <Input
            type="text"
            placeholder={'Название...'}
            {...formik.getFieldProps('title')}
          />
          {Boolean(formik.touched.title) && Boolean(formik.errors.title) && (
            <div className={styles.msgError}>{formik.errors.title}</div>
          )}
        </div>

        <div className={styles.field}>
          <label>Сделать до</label>
          <Input
            type="date"
            placeholder={'Сделать до...'}
            {...formik.getFieldProps('dateOfCompletion')}
          />
          {Boolean(formik.touched.dateOfCompletion) &&
            Boolean(formik.errors.dateOfCompletion) && (
              <div className={styles.msgError}>
                {formik.errors.dateOfCompletion}
              </div>
            )}
        </div>

        <div className={styles.field}>
          <label>Описание</label>
          <TextArea
            placeholder={'Описание...'}
            {...formik.getFieldProps('description')}
          />
          {Boolean(formik.touched.description) &&
            Boolean(formik.errors.description) && (
              <div className={styles.msgError}>{formik.errors.description}</div>
            )}
        </div>

        {fileUrl && fileName && (
          <div>
            <span>Вложенный файл: </span>
            <a href={fileUrl} target={'_blank'} rel="noreferrer">
              {fileName}
            </a>
          </div>
        )}

        <div className={styles.field}>
          <label>Прикрепить документ</label>
          <Input
            type="file"
            ref={fileInputRef}
            placeholder={'Выберите файл...'}
          />
        </div>

        <div className={styles.controlPanelWrap}>
          <Button type={'submit'} disabled={disabled}>
            Сохранить
          </Button>
          <Button type={'button'} onClick={onCancel} disabled={disabled}>
            Отменить
          </Button>
        </div>
      </form>
    </div>
  );
};
