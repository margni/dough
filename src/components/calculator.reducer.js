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

const calculateWeight = (flourWeight, { ballNumber, total }) =>
  round((flourWeight * total) / ballNumber);

const calculatorReducer = (state, { type, value }) => {
  switch (type) {
    case 'ballNumber':
    case 'ballWeight':
    case 'hydration':
    case 'salt':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [type]: value });

    case 'flourWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(value, state),
        }),
        flourWeight: value,
      };

    case 'waterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(value / state.water, state),
        }),
        waterWeight: value,
      };

    case 'saltWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(value / state.salt, state),
        }),
        saltWeight: value,
      };

    case 'starterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(value / state.starter, state),
        }),
        starterWeight: value,
      };

    /* istanbul ignore next */
    default:
      throw new Error();
  }
};

export const useCalculatorReducer = (defaultRecipe) =>
  useReducer(calculatorReducer, defaultRecipe, (state) => calculate(state));
