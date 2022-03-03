import { ReactNode } from 'react';

import styles from './fieldset.module.css';

export const Fieldset = ({
  children,
  legend,
}: {
  children: ReactNode;
  legend: ReactNode;
}) => (
  <fieldset className={styles.host}>
    <legend>{legend}</legend>
    {children}
  </fieldset>
);
