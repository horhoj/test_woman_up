import React, { FC } from 'react';

import { Portal } from '@components/Portal';
import { useAppSelector } from '@store/hooks';
import { todosSlice } from '@store/todos';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const todosIsLoading = useAppSelector(todosSlice.selectors.getIsLoading);

  const isLoading = todosIsLoading;

  return isLoading ? (
    <Portal>
      <div className={styles.Spinner} />
    </Portal>
  ) : null;
};
