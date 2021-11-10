import { Dispatch, useState } from 'react';

import { Number, Validity } from './number';

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
}: {
  label: string;
  max?: string;
  min?: string;
  onDispatch: Dispatch<{ type: string; value: number }>;
  percentage?: boolean;
  property: string;
  readOnly?: boolean;
  state: any;
  step?: string;
  unit?: string;
}) => {
  const [error, setError] = useState<Validity>();

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
      {error && (
        <strong id={`${property}-error`}>
          {error.valueMissing && <>Required</>}
          {error.rangeUnderflow && <> Too low, minimum {min}</>}
          {error.rangeOverflow && <> Too high, maximum {max}</>}
          {error.stepMismatch && <> Must be multiple of {step}</>}
        </strong>
      )}
    </div>
  );
};
