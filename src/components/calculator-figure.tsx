import { Dispatch, ReactNode, useState } from 'react';

import { round } from '../helpers/round';

import { NumericAction, NumericActionType } from './calculator.types';
import { InlineError } from './inline-error';
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
}: {
  label: ReactNode;
  max?: string;
  min?: string;
  onDispatch: Dispatch<NumericAction>;
  percentage?: boolean;
  property: NumericActionType;
  readOnly?: boolean;
  state: any;
  step?: string;
  unit?: string;
}) => {
  const [error, setError] = useState<string>();

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
            onValidity={setError}
            readOnly={readOnly}
            step={step}
            value={round(state[property] * (percentage ? 100 : 1), 3)}
          />
          {unit}
        </div>
      </label>
      {error && <InlineError id={`${property}-error`}>{error}</InlineError>}
    </div>
  );
};
