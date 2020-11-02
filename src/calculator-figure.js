import { Number } from './number';

import styles from './calculator-figure.module.css';

export const CalculatorFigure = ({
  label,
  max,
  min,
  onDispatch,
  percentage,
  property,
  readOnly,
  state,
  step,
  unit,
}) => (
  <label className={styles.host}>
    {label}
    <div>
      <Number
        max={max}
        min={min}
        modifier={percentage ? 100 : 1}
        onChange={(value) => onDispatch({ type: property, value })}
        readOnly={readOnly}
        step={step}
        value={state[property]}
      />
      {unit}
    </div>
  </label>
);
