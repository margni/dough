import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalculatorFigure } from './calculator-figure';

test('Has value from state object.', () => {
  render(<CalculatorFigure state={{ test: 2 }} property="test" />);

  expect(screen.getByRole('spinbutton').value).toEqual('2');
});

test('Renders % as whole number', () => {
  render(<CalculatorFigure percentage state={{ test: 0.1 }} property="test" />);

  expect(screen.getByRole('spinbutton').value).toBe('10');
});

test('Calls dispatcher on change.', () => {
  const fn = jest.fn();

  render(
    <CalculatorFigure onDispatch={fn} state={{ test: 0 }} property="test" />
  );

  userEvent.type(screen.getByRole('spinbutton'), '1');

  expect(fn).toHaveBeenCalledWith({ type: 'test', value: 1 });
});
