import { useCallback, useReducer } from 'react';

import { round } from '../helpers/round';
import {
  Action,
  Ingredient,
  Recipe,
  RecipeIngredient,
  State,
} from './calculator.types';

let _id = 0;

// TODO Could this be simpler, perhaps without a reducer?
const calculate = ({
  weight,
  quantity,
  hydration,
  starter,
  starterHydration,
  ingredients,
}: Recipe): State => {
  const water = hydration - (starter - starter / (1 + starterHydration));
  // Note User is warned when flour does not equal 1, however weights still add
  // up, if a bit weird.
  const flour = round(
    ingredients
      .filter(({ type }) => type === 'flour')
      .reduce((acc, { percent }) => acc + percent, 0),
    3
  );
  const adjunct = round(
    ingredients
      .filter(({ type }) => type === 'adjunct')
      .reduce((acc, { percent }) => acc + percent, 0),
    3
  );
  const total = flour + water + adjunct + starter;

  const unitWeight = (weight * quantity) / total;

  return {
    quantity,
    weight,
    flour,
    hydration,
    starter,
    starterHydration,
    adjunct,
    total,
    water,
    starterWeight: round(starter * unitWeight),
    waterWeight: round(water * unitWeight),
    ingredients: ingredients.map(({ type, label, percent, id }) => ({
      id: id || _id++,
      type,
      label,
      percent,
      weight: round(percent * unitWeight),
    })),
  };
};

const calculateWeight = (
  weight: number,
  { quantity, total }: { quantity: number; total: number }
) => round((weight * total) / quantity);

const calculateBall = (state: State, weight: number) =>
  calculate({
    ...state,
    weight: calculateWeight(weight, state),
  });

const calculatorReducer = (
  state: State,
  { type, value = 0, ingredient }: Action
) => {
  switch (type) {
    case 'quantity':
    case 'weight':
    case 'hydration':
    case 'starter':
    case 'starterHydration':
      return calculate({ ...state, [type]: value });

    case 'waterWeight':
      return {
        ...calculateBall(state, value / state.water),
        waterWeight: value,
      };

    case 'starterWeight':
      return {
        ...calculateBall(state, value / state.starter),
        starterWeight: value,
      };

    case 'add':
    case 'remove':
    case 'update':
      /* v8 ignore next 3 */
      if (!ingredient) {
        throw new Error(`Ingredient action without 'ingredient'.`);
      }

      return ingredientActions[type](state, ingredient);

    /* v8 ignore next 2 */
    default:
      throw new Error();
  }
};

// Just moves flours to the start
const sortIngredients = (a: RecipeIngredient, b: RecipeIngredient) =>
  a.type === 'flour' ? (b.type === 'flour' ? 0 : -1) : 1;

const ingredientActions = {
  // TODO Improve this such as
  // 100% if no flours
  // Half of last value (if at least 10%)
  // Last resort set to 0%
  add: (state: State, newIngredient: Ingredient) =>
    calculate({
      ...state,
      ingredients: [...state.ingredients, newIngredient].sort(sortIngredients),
    }),
  remove: (state: State, removedIngredient: Ingredient) =>
    calculate({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient !== removedIngredient
      ),
    }),
  update: (state: State, newIngredient: Ingredient) => {
    const oldIngredient = state.ingredients.find(
      ({ id }) => id === newIngredient.id
    );

    /* v8 ignore next 3 */
    if (!oldIngredient) {
      throw new Error('Update non existant ingredient!');
    }

    if (newIngredient.weight && oldIngredient.weight !== newIngredient.weight) {
      const intermediateState = {
        ...calculateBall(state, newIngredient.weight / newIngredient.percent),
      };

      return {
        ...intermediateState,
        ingredients: intermediateState.ingredients.map((ingredient) =>
          ingredient.id === newIngredient.id ? newIngredient : ingredient
        ),
      };
    }

    return calculate({
      ...state,
      ingredients: state.ingredients.map((ingredient) =>
        newIngredient.id === ingredient.id ? newIngredient : ingredient
      ),
    });
  },
};

export const useCalculator = (defaultRecipe: Recipe) => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    defaultRecipe,
    (state) => calculate(state)
  );

  return {
    state,
    dispatch,
    add: useCallback(
      (ingredient: Ingredient) => dispatch({ type: 'add', ingredient }),
      []
    ),
    update: useCallback(
      (ingredient: Ingredient) => dispatch({ type: 'update', ingredient }),
      []
    ),
    remove: useCallback(
      (ingredient: Ingredient) => dispatch({ type: 'remove', ingredient }),
      []
    ),
  };
};
