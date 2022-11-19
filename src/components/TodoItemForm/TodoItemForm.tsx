import { useFormik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { TextArea } from '@components/TextArea';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { TodoItemFormValues } from '@entitiesTypes/todo';
import styles from './TodoItemForm.module.scss';

interface TodoItemFormProps {
  initialValues: TodoItemFormValues;
  onSubmit(values: TodoItemFormValues): void;
  onCancel(): void;
  formTitle: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Не должно быть пустым!'),
  description: yup.string().required('Не должно быть пустым!'),
  dateOfCompletion: yup.string().required('Должно быть датой!!!'),
});

export const TodoItemForm: FC<TodoItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  formTitle,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

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

        <div className={styles.controlPanelWrap}>
          <Button type={'submit'}>save</Button>
          <Button type={'button'} onClick={onCancel}>
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
