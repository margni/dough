import { useReducer } from 'react';

import { CalculatorFigure } from './calculator-figure';

import { calcWeights, calculatorReducer } from './calculator.reducer';

import styles from './calculator.module.css';

export const Calculator = () => {
  // TODO Ability to change rounding
  // TODO Ability to specify units
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
          min="1"
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
          state={state}
          unit="g"
        />
        <CalculatorFigure
          label="Starter"
          min="1"
          onDispatch={dispatch}
          property="starterWeight"
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
