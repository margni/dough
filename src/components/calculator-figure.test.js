import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalculatorFigure } from './calculator-figure';

test('Has value from state object.', () => {
  render(<CalculatorFigure state={{ test: 2 }} property="test" />);

  expect(screen.getByRole('spinbutton')).toHaveDisplayValue('2');
});

test('Calls dispatcher on change.', () => {
  const fn = jest.fn();

  render(
    <CalculatorFigure onDispatch={fn} state={{ test: 0 }} property="test" />
  );

  userEvent.type(screen.getByRole('spinbutton'), '1');

  expect(fn).toHaveBeenCalledWith({ type: 'test', value: 1 });
});

test('Converts percentage values.', () => {
  const fn = jest.fn();

  render(
    <CalculatorFigure
      onDispatch={fn}
      percentage
      state={{ test: 0.1 }}
      property="test"
    />
  );

  const input = screen.getByRole('spinbutton');

  expect(input).toHaveDisplayValue('10');

  userEvent.type(input, '{backspace}{backspace}20');

  expect(fn).toHaveBeenLastCalledWith({ type: 'test', value: 0.2 });
});