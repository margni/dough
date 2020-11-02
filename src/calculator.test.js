import { fireEvent, render, screen } from '@testing-library/react';

import { Calculator } from './calculator';

test('Initial weights are correct.', () => {
  render(<Calculator />);

  expect(screen.getByLabelText('Flourg').value).toEqual('265');
  expect(screen.getByLabelText('Waterg').value).toEqual('142');
  expect(screen.getByLabelText('Starterg').value).toEqual('88');
  expect(screen.getByLabelText('Saltg').value).toEqual('5.3');
});

test('Changeing % changes weights.', () => {
  const change = (labelText, value) =>
    fireEvent.change(screen.getByLabelText(labelText), { target: { value } });

  render(<Calculator />);

  change('Count', 1);
  change('Hydration%', 50);
  change('Salt%', 10);
  change('Starter%', 20);
  change('Starter Hydration%', 100);
  change('Weightg', 850);

  expect(screen.getByLabelText('Flourg').value).toEqual('500');
  expect(screen.getByLabelText('Waterg').value).toEqual('200');
  expect(screen.getByLabelText('Starterg').value).toEqual('100');
  expect(screen.getByLabelText('Saltg').value).toEqual('50');
});
