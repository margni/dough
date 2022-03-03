import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calculator } from './calculator';

const change = (labelText, value, input = screen.getByLabelText(labelText)) => {
  userEvent.clear(input);
  userEvent.type(input, value);
};

const configure = () => {
  change('Quantity', '1');
  change('Hydration%', '50');
  change('Salt%', '10');
  change('Starter%', '20');
  change('Starter Hydration%', '100');
};

test('Initial weights are correct.', () => {
  render(<Calculator />);

  expect(screen.getByLabelText('Flourg')).toHaveDisplayValue('265');
  expect(screen.getByLabelText('Waterg')).toHaveDisplayValue('142');
  expect(screen.getByLabelText('Starterg')).toHaveDisplayValue('88');
  expect(screen.getByLabelText('Saltg')).toHaveDisplayValue('5.3');
});

test('Changing ball weight changes ingredient weights.', () => {
  render(<Calculator />);

  configure();

  change('Weightg', '850');

  expect(screen.getByLabelText('Flourg')).toHaveDisplayValue('500');
  expect(screen.getByLabelText('Waterg')).toHaveDisplayValue('200');
  expect(screen.getByLabelText('Starterg')).toHaveDisplayValue('100');
  expect(screen.getByLabelText('Saltg')).toHaveDisplayValue('50');
});

test('Changing ingredient weights changes ball weight.', () => {
  render(<Calculator />);

  configure();

  const weight = screen.getByLabelText('Weightg');

  change('Flourg', '100');

  expect(weight).toHaveDisplayValue('170');

  change('Waterg', '100');

  expect(weight).toHaveDisplayValue('425');

  change('Starterg', '10');

  expect(weight).toHaveDisplayValue('85');

  change('Saltg', '10');

  expect(weight).toHaveDisplayValue('170');
});

test('Adding and removing flours.', () => {
  render(<Calculator />);

  configure();

  userEvent.type(screen.getByRole('textbox', { name: 'Label' }), ' One');

  userEvent.click(screen.getByRole('button', { name: 'Add another flour' }));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'All flours should add up to 100%, currently 110%'
  );

  const percent = screen.getByRole('spinbutton', { name: 'Flour One Percent' });
  userEvent.clear(percent);
  userEvent.type(percent, '90');

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  expect(screen.getByLabelText('Weightg')).toHaveDisplayValue('250');

  userEvent.type(screen.getByRole('spinbutton', { name: 'Flour One g' }), '0');

  expect(screen.getByLabelText('Weightg')).toHaveDisplayValue('2493');

  userEvent.click(screen.getByRole('button', { name: 'Remove Flour' }));

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Remove Flour One' }));

  expect(screen.getByRole('alert')).toBeInTheDocument();
});
