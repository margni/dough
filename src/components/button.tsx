import { MouseEventHandler, ReactNode } from 'react';

import styles from './button.module.css';

export const Button = ({
  children,
  onClick,
  title,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  title?: string;
}) => (
  <button
    aria-label={title}
    className={styles.host}
    onClick={onClick}
    title={title}
  >
    {children}
  </button>
);
