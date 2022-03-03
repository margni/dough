import { ReactNode } from 'react';

import styles from './inline-error.module.css';

export const InlineError = ({
  children,
  id,
  role,
}: {
  children: ReactNode;
  id?: string;
  role?: string;
}) => (
  <strong className={styles.host} id={id} role={role}>
    {children}
  </strong>
);
