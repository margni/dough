import { useState } from 'react';

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
}) => {
  const [error, setError] = useState();

  return (
    <div className={styles.host}>
      <label>
        {label}
        <div>
          <Number
            ariaDescribedby={`${property}-error`}
            max={max}
            min={min}
            onChange={(value) =>
              onDispatch({
                type: property,
                value: round(value * (percentage ? 0.01 : 1), 3),
              })
            }
            onInvalid={setError}
            onValid={setError}
            readOnly={readOnly}
            step={step}
            value={round(state[property] * (percentage ? 100 : 1), 3)}
          />
          {unit}
        </div>
      </label>
      {error?.valueMissing && (
        <strong id={`${property}-error`}>Required</strong>
      )}
      {error?.rangeUnderflow && (
        <strong id={`${property}-error`}>Too low, minimum {min}</strong>
      )}
      {error?.rangeOverflow && (
        <strong id={`${property}-error`}>Too high, maximum {max}</strong>
      )}
      {error?.stepMismatch && (
        <strong id={`${property}-error`}>Must be multiple of {step}</strong>
      )}
    </div>
  );
};
