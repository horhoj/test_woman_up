import {
  InputHTMLAttributes,
  useRef,
  MouseEvent,
  forwardRef,
  useImperativeHandle,
  PropsWithRef,
  ChangeEvent,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import * as iconList from './input.icons';

interface InputProps
  extends InputHTMLAttributes<PropsWithRef<HTMLInputElement>> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [value, setValue] = useState<string | null>(null);

    const handleInputDateIconBtnClk = () => {
      if (inputRef.current) {
        inputRef.current.showPicker();
        inputRef.current.focus();
      }
    };

    const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
      props.onClick && props.onClick(e);
    };

    const handleFileButton = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current && inputRef.current.files) {
        const file = inputRef.current.files[0];
        if (file) {
          setValue(file.name);
        } else {
          setValue(null);
        }
      }

      props.onChange && props.onChange(e);
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
          {props.type === 'file' && (
            <button
              type={'button'}
              onClick={handleFileButton}
              className={styles.inputFileTypeEmulator}
            >
              {value ? value : props.placeholder}
            </button>
          )}
          <input
            className={classNames(styles.input, className)}
            {...props}
            ref={inputRef}
            onClick={handleInputClick}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
