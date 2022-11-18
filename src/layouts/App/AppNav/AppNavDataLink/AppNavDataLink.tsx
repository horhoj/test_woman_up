import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './AppNavDataLink.module.scss';

interface AppNavDataLinkProps {
  link?: string | null;
  text: string;
  onClick?: (() => void) | null;
}

export const AppNavDataLink: FC<AppNavDataLinkProps> = ({
  link = null,
  text,
  onClick = null,
}) => {
  return link ? (
    <NavLink
      className={({ isActive }) =>
        classNames(styles.link, isActive && styles.activeLink)
      }
      to={link}
      end
      onClick={() => onClick && onClick()}
    >
      {text}
    </NavLink>
  ) : (
    <button className={styles.link} onClick={() => onClick && onClick()}>
      {text}
    </button>
  );
};
