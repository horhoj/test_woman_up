import { FC, InputHTMLAttributes, useRef, MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import * as iconList from './input.icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputDateIconBtnClk = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
      inputRef.current.focus();
    }
  };

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
    props.onClick && props.onClick(e);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inputWrap}>
        {props.type === 'date' && (
          <button
            className={styles.inputDateIcon}
            type={'button'}
            onClick={handleInputDateIconBtnClk}
          >
            {iconList.getCalendarIcon}
          </button>
        )}
        <input
          className={classNames(styles.input, className)}
          {...props}
          ref={inputRef}
          onClick={handleInputClick}
        />
      </div>
    </div>
  );
};
