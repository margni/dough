import { Calculator } from './calculator';

import logo from './logo.svg';
import styles from './app.module.css';

export const App = () => (
  <main className={styles.host}>
    <header>
      <h1>Dough</h1>
      <img src={logo} alt=" " />
      <h2>Sourdough Calculator</h2>
    </header>
    <Calculator />
    <footer>
      © <a href="http://margni.com">Margni Ltd.</a> 2020 –{' '}
      <a href="https://github.com/margni/dough">Source</a>
    </footer>
  </main>
);
