import { useReducer } from 'react';

import { CalculatorFigure } from './calculator-figure';

import { calcWeights, calculatorReducer } from './calculator.reducer';

import styles from './calculator.module.css';

// TODO BUG Water weight and salt weight calculations may be off.
// TODO FEATURE Ability to change rounding.
// TODO FEATURE Ability to specify units.
// TODO FEATURE Ability to addextra ingredients.
// TODO FEATURE Ability to specify multiple flour types.
// TODO FEATURE Ability to save your recipe.
// TODO FEATURE Add presets.
// TODO FEATURE Ability to use yeast instead of starter, this would work just like an extra ingredient.
// TODO FEATURE Ability to expand and collapse sections, or perhaps step through wizard style and be presended with weights at the end.
export const Calculator = () => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    {
      ballNumber: 2,
      water: 70,
      starterHydration: 100,
      salt: 2,
      starter: 33,
      flourWeight: 250,
    },
    (state) => calcWeights(state)
  );

  return (
    <form className={styles.host}>
      <fieldset>
        <legend>Doughballs</legend>
        <CalculatorFigure
          label="Count"
          min="1"
          onDispatch={dispatch}
          property="ballNumber"
          state={state}
          step="1"
        />
        <CalculatorFigure
          label="Weight"
          onDispatch={dispatch}
          property="ballWeight"
          state={state}
          unit="g"
        />
      </fieldset>
      <fieldset>
        <legend>Baker’s Percentages</legend>
        <CalculatorFigure
          label="Hydration"
          max="200"
          min="1"
          onDispatch={dispatch}
          property="water"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Salt"
          min=".2"
          onDispatch={dispatch}
          property="salt"
          state={state}
          step="0.2"
          unit="%"
        />
        <CalculatorFigure
          label="Starter"
          min="0"
          onDispatch={dispatch}
          property="starter"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Starter Hydration"
          min="1"
          onDispatch={dispatch}
          property="starterHydration"
          state={state}
          step="0.5"
          unit="%"
        />
      </fieldset>
      <fieldset>
        <legend>Your Recipe</legend>
        <CalculatorFigure
          label="Flour"
          min="1"
          onDispatch={dispatch}
          property="flourWeight"
          state={state}
          unit="g"
        />
        <CalculatorFigure
          label="Water"
          min="1"
          onDispatch={dispatch}
          property="waterWeight"
          readOnly
          state={state}
          unit="g"
        />
        <CalculatorFigure
          label="Starter"
          min="0"
          onDispatch={dispatch}
          property="starterWeight"
          readOnly={state.starter === 0}
          state={state}
          unit="g"
        />
        <CalculatorFigure
          label="Salt"
          min=".1"
          onDispatch={dispatch}
          property="saltWeight"
          readOnly
          state={state}
          unit="g"
        />
      </fieldset>
    </form>
  );
};
