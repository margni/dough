import { useCalculatorReducer } from './calculator.reducer';

import { Button } from './button';
import { CalculatorFigure } from './calculator-figure';
import { CalculatorIngredient } from './calculator-ingredient';
import { Fieldset } from './fieldset';
import { InlineError } from './inline-error';
import { Percent } from './percent';

import styles from './calculator.module.css';

// TODO FEATURE Ability to change rounding.
// TODO FEATURE Ability to specify units.
// TODO FEATURE Ability to add extra ingredients, as in adjuncts, not flours, e.g. seeds.
// TODO FEATURE Ability to save your recipe.
// TODO FEATURE Recipe in querystring
// TODO FEATURE Add presets.
// TODO FEATURE Ability to use yeast instead of starter, this would work just like an extra ingredient.
// TODO FEATURE Ability to expand and collapse sections, or perhaps step through wizard style and be presented with weights at the end.
export const Calculator = () => {
  const [state, dispatch] = useCalculatorReducer({
    quantity: 2,
    weight: 250, //weight/yield
    hydration: 0.7,
    salt: 0.02,
    starter: 0.33,
    starterHydration: 1,
    flours: [
      {
        label: 'Flour',
        percent: 1,
      },
    ],
  });

  return (
    <form autoComplete="off" className={styles.host}>
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
      <Fieldset legend="Baker’s Percentages">
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
          label="Salt"
          min=".2"
          onDispatch={dispatch}
          percentage
          property="salt"
          state={state}
          step="0.2"
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
              onClick={(event) => {
                event.preventDefault();
                dispatch({
                  type: 'add',
                  ingredient: { label: 'Flour', percent: 0 },
                });
              }}
              title="Add another flour"
            >
              +
            </Button>
          </>
        }
      >
        {state.flours.map((ingredient) => (
          <CalculatorIngredient
            key={ingredient.id}
            ingredient={ingredient}
            onDispatch={(ingredient) =>
              dispatch({
                type: 'update',
                ingredient,
              })
            }
            onRemove={() =>
              dispatch({
                type: 'remove',
                ingredient,
              })
            }
          />
        ))}
      </Fieldset>
      <Fieldset legend="Formula">
        {state.flours.map((flour) => (
          <CalculatorFigure
            key={flour.id}
            label={flour.label}
            min="1"
            onDispatch={({ value }) =>
              dispatch({ value, type: 'flourWeight', ingredient: flour })
            }
            property="weight"
            state={flour}
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
        <CalculatorFigure
          label="Salt"
          min=".1"
          onDispatch={dispatch}
          property="saltWeight"
          state={state}
          unit="g"
        />
      </Fieldset>
    </form>
  );
};
