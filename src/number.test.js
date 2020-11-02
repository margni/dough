import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Number } from './number';

test('Has value.', () => {
  render(<Number onChange={() => {}} value="2" />);

  expect(screen.getByRole('spinbutton').value).toEqual('2');
});

test("Doesn't call onChange on invalid change.", () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} step=".2" />);

  userEvent.type(screen.getByRole('spinbutton'), '.1');

  expect(screen.getByRole('spinbutton').value).toEqual('0.1');
  expect(fn).not.toHaveBeenCalled();
});

test('Calls onChange on valid change.', () => {
  const fn = jest.fn();

  render(<Number onChange={fn} value={0} />);

  userEvent.type(screen.getByRole('spinbutton'), '1');

  expect(fn).toHaveBeenCalledWith(1);
});

test('Modifier works', () => {
  const fn = jest.fn();

  render(<Number modifier={100} onChange={fn} value={0.1} />);

  expect(screen.getByRole('spinbutton').value).toBe('10');

  userEvent.type(screen.getByRole('spinbutton'), '{backspace}{backspace}20');

  expect(fn).toHaveBeenLastCalledWith(0.2);
});
