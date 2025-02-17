import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { Number } from './number';

test('Has value.', () => {
  render(<Number onChange={() => {}} value={2} />);

  expect(screen.getByRole('spinbutton')).toHaveDisplayValue('2');
});

test("Doesn't call onChange on invalid change.", async () => {
  const fn = vi.fn();

  render(<Number onChange={fn} value={0} step=".2" />);

  const input = screen.getByRole('spinbutton');

  await userEvent.type(input, '{backspace}.1');

  expect(input).toHaveDisplayValue('0.1');
  expect(fn).not.toHaveBeenCalled();
});

test('Calls onChange on valid change.', async () => {
  const fn = vi.fn();

  render(<Number onChange={fn} value={0} />);

  await userEvent.type(screen.getByRole('spinbutton'), '{backspace}1');

  expect(fn).toHaveBeenCalledWith(1);
});

test('Blurs on Enter.', async () => {
  render(<Number onChange={() => {}} value={1} />);

  const input = screen.getByRole('spinbutton');

  await userEvent.click(input);

  expect(input).toHaveFocus();

  await userEvent.type(input, '{enter}');

  expect(input).not.toHaveFocus();
});

test('Cycles between validity states.', async () => {
  const validity = vi.fn();

  render(<Number onChange={() => {}} onValidity={validity} value={1} />);

  const input = screen.getByRole('spinbutton');

  await userEvent.type(input, '{backspace}');

  expect(validity).toHaveBeenLastCalledWith('Constraints not satisfied');

  await userEvent.type(input, '1');

  expect(validity).toHaveBeenLastCalledWith();
});
