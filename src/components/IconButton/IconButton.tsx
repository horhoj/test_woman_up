import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: FC<IconButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={classNames(styles.wrap, className)} {...props}>
      {children}
    </button>
  );
};
