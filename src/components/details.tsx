import { ReactNode } from 'react';

import styles from './details.module.css';

export const Details = ({
  children,
  summary,
}: {
  children: ReactNode;
  summary: string;
}) => (
  <details className={styles.host}>
    <summary>{summary}</summary>
    {children}
  </details>
);
