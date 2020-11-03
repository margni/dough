import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Number } from './number';

test('Has value.', () => {
  render(<Number onChange={() => {}} value="2" />);

  expect(screen.getByRole('spinbutton')).toHaveDisplayValue('2');
});

test("Doesn't call onChange on invalid change.", () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} step=".2" />);

  userEvent.type(screen.getByRole('spinbutton'), '.1');

  expect(screen.getByRole('spinbutton')).toHaveDisplayValue('0.1');
  expect(fn).not.toHaveBeenCalled();
});

test('Calls onChange on valid change.', () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} />);

  userEvent.type(screen.getByRole('spinbutton'), '{backspace}1');

  expect(fn).toHaveBeenCalledWith(1);
});
