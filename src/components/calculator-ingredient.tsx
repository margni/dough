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
  onDispatch,
  onRemove,
}: {
  ingredient: Ingredient;
  onDispatch: (ingredient: Ingredient) => void;
  onRemove: () => void;
}) => {
  const [labelError, setLabelError] = useState<string>();
  const [percentError, setPercentError] = useState<string>();

  return (
    <div className={styles.host}>
      <Text
        ariaDescribedby={`${ingredient.id}-label-error`}
        ariaLabel="Label"
        onChange={(value) =>
          onDispatch({
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
          min="1"
          onChange={(value) =>
            onDispatch({
              ...ingredient,
              percent: round(value * 0.01, 3),
            })
          }
          onValidity={setPercentError}
          step="0.5"
          value={round(ingredient.percent * 100, 3)}
        />
        <span aria-hidden="true">%</span>
        <Button
          onClick={(event) => {
            event.preventDefault();
            onRemove();
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
