/* v8 ignore start */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Calculator } from './components/calculator';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
);
