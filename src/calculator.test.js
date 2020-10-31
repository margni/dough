import { fireEvent, render, screen } from '@testing-library/react';

import { Calculator } from './calculator';

test('Initial weights are correct.', () => {
  render(<Calculator />);

  expect(screen.getByLabelText('Flourg').value).toEqual('250');
  expect(screen.getByLabelText('Waterg').value).toEqual('163');
  expect(screen.getByLabelText('Starterg').value).toEqual('83');
  expect(screen.getByLabelText('Saltg').value).toEqual('5.8');
});

test('Incrementing ball number changes relative weights.', async () => {
  render(<Calculator />);

  const ballCountInput = screen.getByLabelText('Count');
  const newBallNumber = +ballCountInput.value + 1;

  const flourWeightInput = screen.getByLabelText('Flourg');
  const waterWeightInput = screen.getByLabelText('Waterg');
  const starterWeightInput = screen.getByLabelText('Starterg');
  const saltWeightInput = screen.getByLabelText('Saltg');

  const flourBallWeight = +flourWeightInput.value / +ballCountInput.value;
  const waterBallWeight = +waterWeightInput.value / +ballCountInput.value;
  const starterBallWeight = +starterWeightInput.value / +ballCountInput.value;
  const saltBallWeight = +saltWeightInput.value / +ballCountInput.value;

  fireEvent.change(ballCountInput, { target: { value: newBallNumber } });

  expect(ballCountInput.value).toEqual(newBallNumber.toString());
  expect(flourWeightInput.value).toEqual(
    (flourBallWeight * newBallNumber).toFixed(0)
  );
  expect(waterWeightInput.value).toEqual(
    Math.floor(waterBallWeight * newBallNumber).toString()
  );
  expect(starterWeightInput.value).toEqual(
    Math.floor(starterBallWeight * newBallNumber).toString()
  );
  expect(saltWeightInput.value).toEqual(
    (saltBallWeight * newBallNumber).toFixed(1)
  );
});
