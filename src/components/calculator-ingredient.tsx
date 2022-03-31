import { useState } from 'react';

import { round } from '../helpers/round';

import { Button } from './button';
import { Ingredient } from './calculator.types';
import { InlineError } from './inline-error';
import { Number } from './number';
import { Text } from './text';

import styles from './calculator-ingredient.module.css';

export const CalculatorIngredient = ({
  ingredient,
  min = '1',
  onChange,
  onRemove,
  step = '0.5',
}: {
  ingredient: Ingredient;
  min?: string;
  onChange: (ingredient: Ingredient) => void;
  onRemove: (ingredient: Ingredient) => void;
  step?: string;
}) => {
  const [labelError, setLabelError] = useState<string>();
  const [percentError, setPercentError] = useState<string>();

  return (
    <div className={styles.host}>
      <Text
        ariaDescribedby={`${ingredient.id}-label-error`}
        ariaLabel="Label"
        onChange={(value) =>
          onChange({
            ...ingredient,
            label: value,
          })
        }
        onValidity={setLabelError}
        value={ingredient.label}
      />
      {labelError && (
        <InlineError id={`${ingredient.id}-label-error`}>
          {labelError}
        </InlineError>
      )}
      <div className={styles.percent}>
        <Number
          ariaDescribedby={`${ingredient.id}-percent-error`}
          ariaLabel={`${ingredient.label} Percent`}
          max="100"
          min={min}
          onChange={(value) =>
            onChange({
              ...ingredient,
              percent: round(value * 0.01, 3),
            })
          }
          onValidity={setPercentError}
          step={step}
          value={round(ingredient.percent * 100, 3)}
        />
        <span aria-hidden="true">%</span>
        <Button
          onClick={(event) => {
            event.preventDefault();
            onRemove(ingredient);
          }}
          title={`Remove ${ingredient.label}`}
        >
          −
        </Button>
      </div>
      {percentError && (
        <InlineError id={`${ingredient.id}-percent-error`}>
          {percentError}
        </InlineError>
      )}
    </div>
  );
};
