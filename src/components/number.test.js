import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Number } from './number';

test('Has value.', () => {
  render(<Number value="2" />);

  expect(screen.getByRole('spinbutton')).toHaveDisplayValue('2');
});

test("Doesn't call onChange on invalid change.", () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} step=".2" />);

  const input = screen.getByRole('spinbutton');

  userEvent.type(input, '{backspace}.1');

  expect(input).toHaveDisplayValue('.1');
  expect(fn).not.toHaveBeenCalled();
});

test('Calls onChange on valid change.', () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} />);

  userEvent.type(screen.getByRole('spinbutton'), '{backspace}1');

  expect(fn).toHaveBeenCalledWith(1);
});

test('Blurs on Enter.', () => {
  render(<Number value="1" />);

  const input = screen.getByRole('spinbutton');

  userEvent.click(input);

  expect(input).toHaveFocus();

  userEvent.type(input, '{enter}');

  expect(input).not.toHaveFocus();
});

test('Cycles between validity states.', () => {
  const invalid = jest.fn();
  const valid = jest.fn();

  render(
    <Number onChange={() => {}} onInvalid={invalid} onValid={valid} value="1" />
  );

  const input = screen.getByRole('spinbutton');

  userEvent.type(input, '{backspace}');

  expect(invalid).toHaveBeenCalledTimes(1);
  expect(valid).not.toHaveBeenCalled();

  userEvent.type(input, '1');

  expect(invalid).toHaveBeenCalledTimes(1);
  expect(valid).toHaveBeenCalledTimes(1);
  expect(valid).toHaveBeenCalledWith();
});
