import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalculatorFigure } from './calculator-figure';

test('Has value from state object.', () => {
  render(<CalculatorFigure label="Test" property="test" state={{ test: 2 }} />);

  expect(screen.getByLabelText('Test')).toHaveDisplayValue('2');
});

test('Calls dispatcher on change.', () => {
  const fn = jest.fn();

  render(
    <CalculatorFigure
      label="Test"
      onDispatch={fn}
      property="test"
      state={{ test: 0 }}
    />
  );

  userEvent.type(screen.getByLabelText('Test'), '1');

  expect(fn).toHaveBeenCalledWith({ type: 'test', value: 1 });
});

test('Converts percentage values.', () => {
  const fn = jest.fn();

  render(
    <CalculatorFigure
      label="Test"
      onDispatch={fn}
      percentage
      property="test"
      state={{ test: 0.1 }}
    />
  );

  const input = screen.getByLabelText('Test');

  expect(input).toHaveDisplayValue('10');

  userEvent.type(input, '{backspace}{backspace}20');

  expect(fn).toHaveBeenLastCalledWith({ type: 'test', value: 0.2 });
});

test('Displays validity errors.', async () => {
  render(
    <CalculatorFigure
      label="Test"
      max="3"
      min="2"
      onDispatch={() => {}}
      property="test"
      state={{ test: 2 }}
      step="1"
    />
  );

  const input = screen.getByLabelText('Test');

  userEvent.type(input, '{backspace}');

  expect(screen.getByText('Required')).toBeInTheDocument();

  userEvent.type(input, '4');

  expect(screen.getByText('Too high, maximum 3')).toBeInTheDocument();

  userEvent.type(input, '{backspace}1');

  expect(screen.getByText('Too low, minimum 2')).toBeInTheDocument();

  userEvent.type(input, '{backspace}2.5');

  expect(screen.getByText('Must be multiple of 1')).toBeInTheDocument();
});
