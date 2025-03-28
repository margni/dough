import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { CalculatorFigure } from './calculator-figure';

test('Has value from state object.', () => {
  render(
    <CalculatorFigure
      label="Test"
      property="quantity"
      state={{ quantity: 2 }}
      onDispatch={vi.fn()}
    />,
  );

  expect(screen.getByLabelText('Test')).toHaveDisplayValue('2');
});

test('Calls dispatcher on change.', async () => {
  const fn = vi.fn();

  render(
    <CalculatorFigure
      label="Test"
      onDispatch={fn}
      property="quantity"
      state={{ quantity: 0 }}
    />,
  );

  await userEvent.type(screen.getByLabelText('Test'), '1');

  expect(fn).toHaveBeenCalledWith({ type: 'quantity', value: 1 });
});

test('Converts percentage values.', async () => {
  const fn = vi.fn();

  render(
    <CalculatorFigure
      label="Test"
      onDispatch={fn}
      percentage
      property="starter"
      state={{ starter: 0.1 }}
    />,
  );

  const input = screen.getByLabelText('Test');

  expect(input).toHaveDisplayValue('10');

  await userEvent.type(input, '{backspace}{backspace}20');

  expect(fn).toHaveBeenLastCalledWith({ type: 'starter', value: 0.2 });
});

test('Displays validity errors.', async () => {
  render(
    <CalculatorFigure
      label="Test"
      max="3"
      min="2"
      onDispatch={() => {}}
      property="quantity"
      state={{ quantity: 2 }}
      step="1"
    />,
  );

  const input = screen.getByLabelText('Test');

  await userEvent.type(input, '{backspace}');

  const VALIDITY_ERROR = 'Constraints not satisfied';

  expect(screen.getByText(VALIDITY_ERROR)).toBeInTheDocument();

  await userEvent.type(input, '4');

  expect(screen.getByText(VALIDITY_ERROR)).toBeInTheDocument();

  await userEvent.type(input, '{backspace}1');

  expect(screen.getByText(VALIDITY_ERROR)).toBeInTheDocument();

  await userEvent.type(input, '{backspace}2.5');

  expect(screen.getByText(VALIDITY_ERROR)).toBeInTheDocument();
});
