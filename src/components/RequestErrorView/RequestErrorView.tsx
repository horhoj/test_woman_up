import { FC } from 'react';
import { RequestError } from '@store/types';
import styles from './requestErrorView.module.scss';

interface ErrorViewProps {
  errorTitle: string;
  requestError: RequestError;
}

export const RequestErrorView: FC<ErrorViewProps> = ({
  requestError,
  errorTitle,
}) => {
  return (
    <div className={styles.wrap}>
      <div>{errorTitle}</div>
      <pre>{JSON.stringify(requestError.errorMsg, null, 2)}</pre>
    </div>
  );
};
