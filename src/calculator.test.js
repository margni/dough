import { fireEvent, render, screen } from '@testing-library/react';

import { Calculator } from './calculator';

test('Initial weights are correct.', () => {
  render(<Calculator />);

  expect(screen.getByLabelText('Flourg').value).toEqual('250');
  expect(screen.getByLabelText('Waterg').value).toEqual('163');
  expect(screen.getByLabelText('Starterg').value).toEqual('83');
  expect(screen.getByLabelText('Saltg').value).toEqual('5.8');
});

test('Incrementing ball number changes relative weights.', () => {
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

test('Increasing ball weight changes relative weights.', () => {
  render(<Calculator />);

  const increase = 1.5;
  const ballWeightInput = screen.getByLabelText('Weightg');
  const flourWeightInput = screen.getByLabelText('Flourg');
  const waterWeightInput = screen.getByLabelText('Waterg');
  const starterWeightInput = screen.getByLabelText('Starterg');
  const saltWeightInput = screen.getByLabelText('Saltg');

  const newBallWeight = +ballWeightInput.value * increase;
  const newFlourWeight = +flourWeightInput.value * increase;
  const newWaterWeight = +waterWeightInput.value * increase;
  const newStarterWeight = +starterWeightInput.value * increase;
  const newSaltWeight = +saltWeightInput.value * increase;

  fireEvent.change(ballWeightInput, { target: { value: newBallWeight } });

  expect(ballWeightInput.value).toEqual(newBallWeight.toString());
  expect(flourWeightInput.value).toEqual(newFlourWeight.toString());
  expect(waterWeightInput.value).toEqual(Math.floor(newWaterWeight).toString());
  expect(starterWeightInput.value).toEqual(
    Math.floor(newStarterWeight).toString()
  );
  expect(saltWeightInput.value).toEqual(newSaltWeight.toString());
});

test('Increasing salt % increases salt weight.', () => {
  render(<Calculator />);

  const saltPercentInput = screen.getByLabelText('Salt%');
  const starterPercentInput = screen.getByLabelText('Starter%');
  const starterHydrationPercentInput = screen.getByLabelText(
    'Starter Hydration%'
  );

  const flourWeightInput = screen.getByLabelText('Flourg');
  const saltWeightInput = screen.getByLabelText('Saltg');

  fireEvent.change(flourWeightInput, { target: { value: 500 } });
  fireEvent.change(starterHydrationPercentInput, { target: { value: 100 } });
  fireEvent.change(starterPercentInput, { target: { value: 20 } });
  fireEvent.change(saltPercentInput, { target: { value: 10 } });

  expect(saltWeightInput.value).toEqual('55');
});
