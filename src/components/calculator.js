import { useReducer } from 'react';

import { CalculatorFigure } from './calculator-figure';

import { calculate, calculatorReducer } from './calculator.reducer';

import styles from './calculator.module.css';

// TODO FEATURE Ability to change rounding.
// TODO FEATURE Ability to specify units.
// TODO FEATURE Ability to add extra ingredients.
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
      ballWeight: 250,
      hydration: 0.7,
      starterHydration: 1,
      salt: 0.02,
      starter: 0.33,
    },
    (state) => calculate(state)
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
          min="10"
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
          percentage
          property="hydration"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Salt"
          min=".2"
          onDispatch={dispatch}
          percentage
          property="salt"
          state={state}
          step="0.2"
          unit="%"
        />
        <CalculatorFigure
          label="Starter"
          min="0"
          onDispatch={dispatch}
          percentage
          property="starter"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Starter Hydration"
          max="200"
          min="1"
          onDispatch={dispatch}
          percentage
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
          state={state}
          unit="g"
        />
      </fieldset>
    </form>
  );
};
