import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { Text } from './text';

test("Doesn't call onChange on invalid change.", async () => {
  const fn = vi.fn();

  render(<Text onChange={fn} value="T" />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, '{backspace}');

  expect(input).toHaveDisplayValue('');
  expect(fn).not.toHaveBeenCalled();
});

test('Blurs on Enter.', async () => {
  render(<Text onChange={() => {}} value="TEST" />);

  const input = screen.getByRole('textbox');

  await userEvent.click(input);

  expect(input).toHaveFocus();

  await userEvent.type(input, '{enter}');

  expect(input).not.toHaveFocus();
});

test('Cycles between validity states.', async () => {
  const validity = vi.fn();

  render(<Text onChange={vi.fn()} onValidity={validity} value="T" />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, '{backspace}');

  expect(validity).toHaveBeenLastCalledWith('Constraints not satisfied');

  await userEvent.type(input, 'T');

  expect(validity).toHaveBeenLastCalledWith();
});
