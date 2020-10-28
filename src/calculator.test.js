import { fireEvent, render, screen } from '@testing-library/react';

import { Calculator } from './calculator';

test('Incrementing ball number changes flour weight.', () => {
  render(<Calculator />);

  const ballCountInput = screen.getByLabelText('Count');
  const newBallNumber = +ballCountInput.value + 1;

  const flourWeightInput = screen.getByLabelText('Flourg');

  fireEvent.change(ballCountInput, { target: { value: newBallNumber } });

  expect(flourWeightInput.value).toEqual(
    ((+flourWeightInput.value / +ballCountInput.value) * newBallNumber).toFixed(
      0
    )
  );
});
