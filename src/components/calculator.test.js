import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calculator } from './calculator';

const change = (labelText, value, input = screen.getByLabelText(labelText)) => {
  userEvent.clear(input);
  userEvent.type(input, value);
};

const configure = async () => {
  change('Quantity', '1');
  change('Hydration%', '50');
  change('Salt Percent', '10');
  change('Starter%', '20');
  change('Starter Hydration%', '100');
};

test('Initial weights are correct.', () => {
  render(<Calculator />);

  expect(screen.getByLabelText('Flourg')).toHaveDisplayValue('265');
  expect(screen.getByLabelText('Waterg')).toHaveDisplayValue('142');
  expect(screen.getByLabelText('Starterg')).toHaveDisplayValue('88');
  expect(screen.getByLabelText('Saltg')).toHaveDisplayValue('5');
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

  userEvent.type(screen.getAllByRole('textbox', { name: 'Label' })[0], ' One');

  userEvent.click(screen.getByRole('button', { name: 'Add a flour' }));

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

  expect(screen.getByRole('alert')).toHaveTextContent(
    'All flours should add up to 100%, currently 90%'
  );

  userEvent.click(screen.getByRole('button', { name: 'Remove Flour One' }));

  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('Adding and removing adjuncts.', () => {
  render(<Calculator />);

  configure();

  userEvent.click(screen.getByRole('button', { name: 'Add an adjunct' }));

  expect(screen.getByLabelText('Adjunctg')).toHaveDisplayValue('14');

  userEvent.click(screen.getByRole('button', { name: 'Remove Adjunct' }));

  expect(screen.queryByLabelText('Adjunctg')).not.toBeInTheDocument();
});
