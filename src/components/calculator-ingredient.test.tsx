import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalculatorIngredient } from './calculator-ingredient';

test('Shows error on invalid', () => {
  render(
    <CalculatorIngredient
      ingredient={{ id: 1, label: 'Test', percent: 1, weight: 1 }}
      onDispatch={jest.fn()}
      onRemove={jest.fn()}
    />
  );

  userEvent.clear(screen.getByRole('textbox', { name: 'Label' }));

  expect(screen.getByText('Constraints not satisfied')).toBeInTheDocument();
});
