import { useReducer } from 'react';

import { round } from '../helpers/round';
import { Action, Recipe, RecipeIngredient, State } from './calculator.types';

let _id = 0;

const calculate = ({
  weight,
  quantity,
  hydration,
  salt,
  starter,
  starterHydration,
  flours,
}: Recipe): State => {
  const water = hydration - (starter - starter / (1 + starterHydration));
  // Note User is warned when flour does not equal 1, however weights still add
  // up, if a bit weird.
  const flour = round(
    flours.reduce((acc, flour) => acc + flour.percent, 0),
    3
  );
  const total = flour + water + salt + starter;

  const flourWeight = (weight * quantity) / total;

  return {
    quantity,
    weight,
    flour,
    hydration,
    salt,
    starter,
    starterHydration,
    total,
    water,
    saltWeight: round(flourWeight * salt, 1),
    starterWeight: round(flourWeight * starter),
    waterWeight: round(flourWeight * water),
    flours: flours.map(({ label, percent, id }) => ({
      id: id || _id++,
      label,
      percent,
      weight: round(flourWeight * percent),
    })),
  };
};

const calculateWeight = (
  flourWeight: number,
  { quantity, total }: { quantity: number; total: number }
) => round((flourWeight * total) / quantity);

const calculateBall = (state: State, flourWeight: number) =>
  calculate({
    ...state,
    weight: calculateWeight(flourWeight, state),
  });

const calculatorReducer = (
  state: State,
  { type, value = 0, ingredient }: Action
) => {
  switch (type) {
    case 'quantity':
    case 'weight':
    case 'hydration':
    case 'salt':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [type]: value });

    // TODO Is it possible to simplify and standardize weight reverse engineering?
    case 'flourWeight':
      /* istanbul ignore next */
      if (!ingredient) {
        throw new Error(`'flourWeight' without 'ingredient'.`);
      }

      return {
        ...calculateBall(state, +value / ingredient.percent),
        flours: state.flours.map((flour) =>
          flour === ingredient ? { ...flour, weight: +value } : flour
        ),
      };

    case 'waterWeight':
      return {
        ...calculateBall(state, +value / state.water),
        waterWeight: +value,
      };

    case 'saltWeight':
      return {
        ...calculateBall(state, +value / state.salt),
        saltWeight: +value,
      };

    case 'starterWeight':
      return {
        ...calculateBall(state, +value / state.starter),
        starterWeight: +value,
      };

    case 'add':
    case 'remove':
    case 'update':
      /* istanbul ignore next */
      if (!ingredient) {
        throw new Error(`Ingredient action without 'ingredient'.`);
      }

      return ingredientActions[type](state, ingredient);

    /* istanbul ignore next */
    default:
      throw new Error();
  }
};

const ingredientActions = {
  add: (state: State, { label }: RecipeIngredient) =>
    // TODO Improve this such as
    // 100% if no flours
    // Half of last value (if at least 10%)
    // Last resort set to 0%
    calculate({
      ...state,
      flours: [...state.flours, { label, percent: 0.1 }],
    }),
  remove: (state: State, ingredient: RecipeIngredient) => {
    const flours = state.flours
      .filter((flour) => flour !== ingredient)
      .map((flour) => ({ ...flour }));

    if (flours.length) {
      const remainder = 1 - state.flour + ingredient.percent;
      flours[flours.length - 1].percent += remainder > 0 ? remainder : 0;
    }

    return calculate({
      ...state,
      flours,
    });
  },
  update: (state: State, ingredient: RecipeIngredient) =>
    calculate({
      ...state,
      flours: state.flours.map((flour) =>
        flour.id === ingredient.id ? ingredient : flour
      ),
    }),
};

export const useCalculatorReducer = (defaultRecipe: Recipe) =>
  useReducer(calculatorReducer, defaultRecipe, (state) => calculate(state));
