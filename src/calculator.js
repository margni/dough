import { useReducer } from 'react';

import { Number } from './number';

import { calcWeights, calculatorReducer } from './calculator.reducer';

import styles from './calculator.module.css';

export const Calculator = () => {
  // TODO Ability to change rounding
  const [state, dispatch] = useReducer(
    calculatorReducer,
    {
      ballNumber: 2,
      water: 70,
      starterHydration: 100,
      salt: 2,
      starter: 33,
      flourWeight: 265,
    },
    (state) => calcWeights(state)
  );

  return (
    <div className={styles.host}>
      <fieldset>
        <legend>Doughballs</legend>
        <label>
          Count
          <Number
            min="1"
            onDispatch={dispatch}
            property="ballNumber"
            state={state}
          />
        </label>
        <label>
          Weight
          <Number
            min="1"
            onDispatch={dispatch}
            property="ballWeight"
            state={state}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Baker’s Percentages</legend>
        <label>
          Hydration
          <Number
            max="200"
            min="1"
            onDispatch={dispatch}
            property="water"
            state={state}
          />
        </label>
        <label>
          Salt
          <Number
            min=".2"
            onDispatch={dispatch}
            property="salt"
            state={state}
            step="0.2"
          />
        </label>
        <label>
          Starter
          <Number
            min="1"
            onDispatch={dispatch}
            property="starter"
            state={state}
            step="0.5"
          />
        </label>
        <label>
          Starter Hydration
          <Number
            min="1"
            onDispatch={dispatch}
            property="starterHydration"
            state={state}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Your Recipe</legend>
        <label>
          Flour
          <Number
            min="1"
            onDispatch={dispatch}
            property="flourWeight"
            state={state}
          />
        </label>
        <label>
          Water
          <Number
            min="1"
            onDispatch={dispatch}
            property="waterWeight"
            state={state}
          />
        </label>
        <label>
          Starter
          <Number
            min="1"
            onDispatch={dispatch}
            property="starterWeight"
            state={state}
          />
        </label>
        <label>
          Salt
          <Number
            min=".1"
            onDispatch={dispatch}
            property="saltWeight"
            state={state}
          />
        </label>
      </fieldset>
    </div>
  );
};
