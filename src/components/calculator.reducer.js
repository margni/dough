import { useReducer } from 'react';

import { round } from '../round';

const calculate = ({
  ballWeight,
  ballNumber,
  hydration,
  salt,
  starter,
  starterHydration,
}) => {
  const water = hydration - (starter - starter / (1 + starterHydration));
  const total = 1 + water + salt + starter;

  const flourWeight = (ballWeight * ballNumber) / total;

  return {
    ballNumber,
    ballWeight,
    hydration,
    salt,
    starter,
    starterHydration,
    total,
    water,
    flourWeight: round(flourWeight),
    saltWeight: round(flourWeight * salt, 1),
    starterWeight: round(flourWeight * starter),
    waterWeight: round(flourWeight * water),
  };
};

const calculateWeight = (flourWeight, state) =>
  round((flourWeight * state.total) / state.ballNumber);

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'ballNumber':
    case 'ballWeight':
    case 'hydration':
    case 'salt':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [action.type]: action.value });

    case 'flourWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value, state),
        }),
        flourWeight: action.value,
      };

    case 'waterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.water, state),
        }),
        waterWeight: action.value,
      };

    case 'saltWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.salt, state),
        }),
        saltWeight: action.value,
      };

    case 'starterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.starter, state),
        }),
        starterWeight: action.value,
      };

    /* istanbul ignore next */
    default:
      throw new Error();
  }
};

export const useCalculatorReducer = () =>
  useReducer(
    calculatorReducer,
    {
      ballNumber: 2,
      ballWeight: 250,
      hydration: 0.7,
      salt: 0.02,
      starter: 0.33,
      starterHydration: 1,
    },
    (state) => calculate(state)
  );
