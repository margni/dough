import styles from './details.module.css';

export const Details = ({ children, summary }) => (
  <details className={styles.host}>
    <summary>{summary}</summary>
    {children}
  </details>
);
