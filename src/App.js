import { Calculator } from "./calculator";

import logo from "./logo.svg";
import styles from "./app.module.css";

export const App = () => (
  <main className={styles.host}>
    <header>
      <h1>Dough</h1>
      <h2>Sourdough Calculator</h2>
      <img src={logo} alt=" " />
    </header>
    <Calculator />
    <footer>
      © <a href="http://margni.com">Margni Ltd.</a> 2020
    </footer>
  </main>
);
