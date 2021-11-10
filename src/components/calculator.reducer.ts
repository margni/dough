import { useReducer } from 'react';

import { round } from '../round';

export type Flour = { percent: number; weight?: number };

export type Flours = Record<string, Flour>;

export type Recipe = {
  ballNumber: number;
  ballWeight: number;
  hydration: number;
  salt: number;
  starter: number;
  starterHydration: number;
  flours: Flours;
};

export type State = Recipe & {
  total: number;
  water: number;
  saltWeight: number;
  starterWeight: number;
  waterWeight: number;
};

const flourMap = (
  flours: Flours,
  callback: (flour: Flour, name: string) => Flour
) =>
  Object.fromEntries(
    Object.entries(flours).map(([name, flour]) => [name, callback(flour, name)])
  ) as unknown as Flours;

const calculate = ({
  ballWeight,
  ballNumber,
  hydration,
  salt,
  starter,
  starterHydration,
  flours,
}: Recipe): State => {
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
    flours: flourMap(flours, ({ percent }) => ({
      percent,
      weight: round(flourWeight * percent),
    })),
  };
};

const calculateWeight = (
  flourWeight: number,
  { ballNumber, total }: { ballNumber: number; total: number }
) => round((flourWeight * total) / ballNumber);

const calculateBall = (state: State, flourWeight: number) =>
  calculate({
    ...state,
    ballWeight: calculateWeight(flourWeight, state),
  });

const calculatorReducer = (
  state: State,
  { property, type, value }: { property?: string; type: string; value: number }
) => {
  switch (type) {
    case 'ballNumber':
    case 'ballWeight':
    case 'hydration':
    case 'salt':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [type]: value });

    case 'flourWeight':
      /* istanbul ignore next */
      if (!property) {
        throw new Error(`'flourWeight' without 'property'.`);
      }

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

export const useCalculatorReducer = (defaultRecipe: Recipe) =>
  useReducer(calculatorReducer, defaultRecipe, (state) => calculate(state));
