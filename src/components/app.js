import { Calculator } from './calculator';
import { Details } from './details';

import logo from '../logo.svg';
import styles from './app.module.css';

export const App = () => (
  <main className={styles.host}>
    <header>
      <h1>Dough</h1>
      <img src={logo} alt="" />
      <h2>Sourdough Pizza Calculator</h2>
    </header>
    <div>
      <Details summary="Help?">
        All figures are editable and changes will adjust other figures
        accordingly.
        <br />
        Also note that all figures are required.
      </Details>
      <Calculator />
    </div>
    <footer>
      © <a href="http://margni.com">Margni Ltd.</a> 2020 –{' '}
      <a href="https://github.com/margni/dough">Source</a>
    </footer>
  </main>
);
