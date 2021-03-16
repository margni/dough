import { useReducer } from 'react';

import { round } from '../round';

const objectMap = (object, callback) =>
  Object.fromEntries(
    Object.entries(object).map(([property, value]) => [
      property,
      callback(value, property),
    ])
  );

const calculate = ({
  ballWeight,
  ballNumber,
  hydration,
  salt,
  starter,
  starterHydration,
  flours,
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
    saltWeight: round(flourWeight * salt, 1),
    starterWeight: round(flourWeight * starter),
    waterWeight: round(flourWeight * water),
    flours: objectMap(flours, ({ percent }) => ({
      percent,
      weight: round(flourWeight * percent),
    })),
  };
};

const calculateWeight = (flourWeight, { ballNumber, total }) =>
  round((flourWeight * total) / ballNumber);

const calculateBall = (state, flourWeight) =>
  calculate({
    ...state,
    ballWeight: calculateWeight(flourWeight, state),
  });

const calculatorReducer = (state, { property, type, value }) => {
  switch (type) {
    case 'ballNumber':
    case 'ballWeight':
    case 'hydration':
    case 'salt':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [type]: value });

    case 'flourWeight':
      const newState = calculateBall(
        state,
        value / state.flours[property].percent
      );
      newState.flours[property].weight = value;

      return newState;

    case 'waterWeight':
      return {
        ...calculateBall(state, value / state.water),
        waterWeight: value,
      };

    case 'saltWeight':
      return {
        ...calculateBall(state, value / state.salt),
        saltWeight: value,
      };

    case 'starterWeight':
      return {
        ...calculateBall(state, value / state.starter),
        starterWeight: value,
      };

    /* istanbul ignore next */
    default:
      throw new Error();
  }
};

export const useCalculatorReducer = (defaultRecipe) =>
  useReducer(calculatorReducer, defaultRecipe, (state) => calculate(state));
