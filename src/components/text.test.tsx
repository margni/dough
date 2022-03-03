import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Text } from './text';

test("Doesn't call onChange on invalid change.", () => {
  const fn = jest.fn();

  render(<Text onChange={fn} value="T" />);

  const input = screen.getByRole('textbox');

  userEvent.type(input, '{backspace}');

  expect(input).toHaveDisplayValue('');
  expect(fn).not.toHaveBeenCalled();
});

test('Blurs on Enter.', () => {
  render(<Text onChange={() => {}} value="TEST" />);

  const input = screen.getByRole('textbox');

  userEvent.click(input);

  expect(input).toHaveFocus();

  userEvent.type(input, '{enter}');

  expect(input).not.toHaveFocus();
});

test('Cycles between validity states.', () => {
  const validity = jest.fn();

  render(<Text onChange={jest.fn()} onValidity={validity} value="T" />);

  const input = screen.getByRole('textbox');

  userEvent.type(input, '{backspace}');

  expect(validity).toHaveBeenLastCalledWith('Constraints not satisfied');

  userEvent.type(input, 'T');

  expect(validity).toHaveBeenLastCalledWith();
});
