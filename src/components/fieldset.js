import styles from './fieldset.module.css';

export const Fieldset = ({ children, legend }) => (
  <fieldset className={styles.host}>
    <legend>{legend}</legend>
    {children}
  </fieldset>
);
