import { FC } from 'react';
import styles from './AboutPage.module.scss';

export const AboutPage: FC = () => {
  return (
    <div className={styles.wrap}>
      <div>
        <h2>О проекте</h2>
        <p>
          Данный проект предназначен для демонстрации навыков разработки на
          react и сопутствующих технологиях
        </p>
      </div>

      <div>
        <h3>Стек</h3>
        <p>
          бэк на firebase, typescript, react, redux-toolkit, sass, date-fns,
          formik, yup, uuid, docker, eslint, prettier
        </p>
      </div>

      <div>
        <h3>Сведения о разработчике</h3>
        <p>
          Меня зовут Василий. Я разработчик js. Специализируюсь на стеке
          typescript, react, redux-toolkit и фронтент разработке, но не
          ограничен данными технологиями ))
        </p>
      </div>

      <div>
        <h3>github</h3>
        <a href="https://github.com/horhoj" target={'_blank'} rel="noreferrer">
          https://github.com/horhoj
        </a>
      </div>

      <div>
        <h3>Telegram</h3>
        <a
          href="https://t.me/sarevok_horhoj"
          target={'_blank'}
          rel="noreferrer"
        >
          https://t.me/sarevok_horhoj
        </a>
      </div>
    </div>
  );
};
