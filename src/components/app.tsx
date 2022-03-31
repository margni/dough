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
        <ul>
          <li>
            All figures are required and editable, changes will adjust other
            figures accordingly.
          </li>
          <li>
            Weights are rounded for simplicity, so things might be out a couple
            of g.
          </li>
          <li>
            If you put wacky numbers in you'll get wacky numbers out, and a
            probably not a very nice dough either!
          </li>
          <li>
            The calculator assumes you are using your starter like a levain or
            preferment.
          </li>
          <li>Water is total hydration minus water in starter.</li>
        </ul>
        <h2>Instructions</h2>
        <ol>
          <li>Specify doughball quantity &amp; weight.</li>
          <li>Specify flour baker's percentages.</li>
          <li>
            Specify non-flour baker's percentages such as hydration (% of total
            flour weight).
          </li>
          <li>
            Make your doughballs, the recipe is up you you, this can only give
            you your formula.
          </li>
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
