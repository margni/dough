import { Calculator } from './calculator';
import { Details } from './details';

import logo from '../logo.svg';
import styles from './app.module.css';

export const App = () => (
  <main className={styles.host}>
    <header>
      <h1>Dough</h1>
      <img src={logo} alt="" />
      <h2>Sourdough Calculator</h2>
    </header>
    <div>
      <Details summary="Help?">
        All figures are required and editable, changes will adjust other figures
        accordingly.
        <br />
        Note if you put wacky numbers in you'll get wacky numbers out, and a
        yucky dough!
        <h2>Instructions</h2>
        <ol>
          <li>Specify doughball quantity &amp; weight.</li>
          <li>
            Specify ingredient ratios such as hydration (% of total flour
            weight).
          </li>
          <li>Specify flour ratios.</li>
          <li>Make your doughballs.</li>
        </ol>
      </Details>
      <Calculator />
    </div>
    <footer>
      © <a href="http://margni.com">Margni Ltd.</a> 2020 –{' '}
      <a href="https://github.com/margni/dough">Source</a>
    </footer>
  </main>
);
