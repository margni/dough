import { fireEvent, render, screen } from "@testing-library/react";

import { Calculator } from "./calculator";

test("Incrementing ball number changes flour weight.", () => {
  render(<Calculator />);

  const ballNumberInput = screen.getByLabelText("Number");
  const newBallNumber = +ballNumberInput.value + 1;

  const flourInput = screen.getByLabelText("Flour");

  fireEvent.change(ballNumberInput, { target: { value: newBallNumber } });

  expect(flourInput.value).toEqual(
    ((+flourInput.value / +ballNumberInput.value) * newBallNumber).toFixed(1)
  );
});
