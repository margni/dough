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
        onChange={(value) =>
          onDispatch({ type: property, value: value / (percentage ? 100 : 1) })
        }
        readOnly={readOnly}
        step={step}
        value={state[property] * (percentage ? 100 : 1)}
      />
      {unit}
    </div>
  </label>
);
