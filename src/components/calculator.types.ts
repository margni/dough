/* istanbul ignore file */
// TODO id is not optional it shouldn't be included at all, this is just to simplify typing
export type RecipeIngredient = { label: string; percent: number; id?: number };
export type Ingredient = RecipeIngredient & { id: number; weight: number };

export type RecipeFlours = RecipeIngredient[];
export type Flours = Ingredient[];

export type Recipe = {
  quantity: number;
  weight: number;
  hydration: number;
  salt: number;
  starter: number;
  starterHydration: number;
  flours: RecipeFlours;
};

export type State = Omit<Recipe, 'flours'> & {
  flour: number;
  total: number;
  water: number;
  saltWeight: number;
  starterWeight: number;
  waterWeight: number;
  flours: Flours;
};

export type NumericActionType =
  | 'weight'
  | 'quantity'
  | 'weight'
  | 'hydration'
  | 'salt'
  | 'starter'
  | 'starterHydration'
  | 'waterWeight'
  | 'saltWeight'
  | 'starterWeight';

export type NumericAction = {
  ingredient?: never;
  type: NumericActionType;
  value: number;
};

export type IngredientAction = {
  ingredient: RecipeIngredient;
  type: 'add' | 'remove' | 'update';
  value?: never;
};

export type Action =
  | NumericAction
  | IngredientAction
  | { type: 'flourWeight'; value: number; ingredient: RecipeIngredient };
