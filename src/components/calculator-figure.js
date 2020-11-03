import { Number } from './number';

import { round } from '../round';

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
          onDispatch({
            type: property,
            value: round(value * (percentage ? 0.01 : 1), 3),
          })
        }
        readOnly={readOnly}
        step={step}
        value={round(state[property] * (percentage ? 100 : 1), 3)}
      />
      {unit}
    </div>
  </label>
);
