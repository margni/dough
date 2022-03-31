import { Button } from './button';
import { CalculatorFigure } from './calculator-figure';
import { CalculatorIngredient } from './calculator-ingredient';
import { Fieldset } from './fieldset';
import { InlineError } from './inline-error';
import { Percent } from './percent';

import { useCalculator } from './calculator.reducer';
import { Recipe } from './calculator.types';

import styles from './calculator.module.css';

// TODO FEATURE Ability to change rounding.
// TODO FEATURE Ability to specify units.
// TODO FEATURE Ability to save your recipe.
// TODO FEATURE Recipe in querystring
// TODO FEATURE Add presets.
// TODO FEATURE Ability to use yeast instead of starter, this would work just like an extra ingredient.
// TODO FEATURE Ability to expand and collapse sections, or perhaps step through wizard style and be presented with weights at the end.
const defaultRecipe: Recipe = {
  quantity: 2,
  weight: 250,
  hydration: 0.7,
  starter: 0.33,
  starterHydration: 1,
  ingredients: [
    {
      type: 'flour',
      label: 'Flour',
      percent: 1,
    },
    {
      type: 'adjunct',
      label: 'Salt',
      percent: 0.02,
    },
  ],
};

export const Calculator = () => {
  const {
    state: { ingredients, ...state },
    dispatch,
    add,
    update,
    remove,
  } = useCalculator(defaultRecipe);

  return (
    <div className={styles.host}>
      <Fieldset legend="Doughballs">
        <CalculatorFigure
          label="Quantity"
          min="1"
          onDispatch={dispatch}
          property="quantity"
          state={state}
          step="1"
        />
        <CalculatorFigure
          min="10"
          label="Weight"
          onDispatch={dispatch}
          property="weight"
          state={state}
          unit="g"
        />
      </Fieldset>
      <Fieldset
        legend={
          <>
            Flours
            {state.flour !== 1 && (
              <InlineError role="alert">
                All flours should add up to 100%, currently{' '}
                <Percent value={state.flour} />
              </InlineError>
            )}
            <Button
              onClick={() => {
                add({ type: 'flour', label: 'Flour', percent: 0.1 });
              }}
              title="Add a flour"
            >
              +
            </Button>
          </>
        }
      >
        {ingredients
          .filter(({ type }) => type === 'flour')
          .map((ingredient) => (
            <CalculatorIngredient
              key={ingredient.id}
              ingredient={ingredient}
              onChange={update}
              onRemove={remove}
            />
          ))}
      </Fieldset>
      <Fieldset
        legend={
          <>
            Others
            <Button
              onClick={() => {
                add({ type: 'adjunct', label: 'Adjunct', percent: 0.1 });
              }}
              title="Add an adjunct"
            >
              +
            </Button>
          </>
        }
      >
        {ingredients
          .filter(({ type }) => type === 'adjunct')
          .map((ingredient) => (
            <CalculatorIngredient
              key={ingredient.id}
              ingredient={ingredient}
              min="0.5"
              onChange={update}
              onRemove={remove}
              step="0.5"
            />
          ))}
        <CalculatorFigure
          label="Hydration"
          max="200"
          min="1"
          onDispatch={dispatch}
          percentage
          property="hydration"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Starter"
          min="0"
          onDispatch={dispatch}
          percentage
          property="starter"
          state={state}
          step="0.5"
          unit="%"
        />
        <CalculatorFigure
          label="Starter Hydration"
          max="200"
          min="1"
          onDispatch={dispatch}
          percentage
          property="starterHydration"
          state={state}
          step="0.5"
          unit="%"
        />
      </Fieldset>
      <Fieldset legend="Formula">
        {ingredients.map((ingredient) => (
          <CalculatorFigure
            key={ingredient.id}
            label={ingredient.label}
            min="1"
            onDispatch={({ value }) => update({ ...ingredient, weight: value })}
            property="weight"
            state={ingredient}
            unit="g"
          />
        ))}
        <CalculatorFigure
          label="Water"
          min="1"
          onDispatch={dispatch}
          property="waterWeight"
          state={state}
          unit="g"
        />
        <CalculatorFigure
          label="Starter"
          min="0"
          onDispatch={dispatch}
          property="starterWeight"
          readOnly={state.starter === 0}
          state={state}
          unit="g"
        />
      </Fieldset>
    </div>
  );
};
