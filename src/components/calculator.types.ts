/* istanbul ignore file */
// TODO id and weight are not optional, they shouldn't be included at all, this
// is just to simplify typing.
type Flour = {
  type: 'flour';
  label: string;
  percent: number;
  id?: number;
  weight?: number;
};
type Adjunct = {
  type: 'adjunct';
  label: string;
  percent: number;
  id?: number;
  weight?: number;
};

export type RecipeIngredient = Flour | Adjunct;
export type Ingredient = RecipeIngredient & { id?: number; weight?: number };

export type RecipeIngredients = RecipeIngredient[];
export type Ingredients = Ingredient[];

export type Recipe = {
  quantity: number;
  weight: number;
  hydration: number;
  starter: number;
  starterHydration: number;
  ingredients: RecipeIngredients;
};

export type State = Omit<Recipe, 'ingredients'> & {
  flour: number;
  water: number;
  adjunct: number;
  total: number;
  starterWeight: number;
  waterWeight: number;
  ingredients: Ingredients;
};

export type NumericActionType =
  | 'weight'
  | 'quantity'
  | 'hydration'
  | 'starter'
  | 'starterHydration'
  | 'waterWeight'
  | 'starterWeight';

export type NumericAction = {
  ingredient?: never;
  type: NumericActionType;
  value: number;
};

export type IngredientAction = {
  ingredient: Ingredient;
  type: 'add' | 'remove' | 'update';
  value?: never;
};

export type Action = NumericAction | IngredientAction;
