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
            state={state}
            property="ballNumber"
          />
        </label>
        <label>
          Weight
          <Number
            min="1"
            onDispatch={dispatch}
            state={state}
            property="ballWeight"
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
            state={state}
            property="water"
          />
        </label>
        <label>
          Salt
          <Number
            min=".2"
            onDispatch={dispatch}
            state={state}
            step="0.2"
            property="salt"
          />
        </label>
        <label>
          Starter
          <Number
            min="1"
            onDispatch={dispatch}
            state={state}
            step="0.5"
            property="starter"
          />
        </label>
        <label>
          Starter Hydration
          <Number
            min="1"
            onDispatch={dispatch}
            state={state}
            property="starterHydration"
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
            state={state}
            property="flourWeight"
          />
        </label>
        <label>
          Water
          <Number
            min="1"
            onDispatch={dispatch}
            state={state}
            property="waterWeight"
          />
        </label>
        <label>
          Starter
          <Number
            min="1"
            onDispatch={dispatch}
            state={state}
            property="starterWeight"
          />
        </label>
        <label>
          Salt
          <Number
            min=".1"
            onDispatch={dispatch}
            state={state}
            property="saltWeight"
          />
        </label>
      </fieldset>
    </div>
  );
};
