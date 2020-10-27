import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Number } from "./number";

test("Has value from state object.", () => {
  render(<Number onDispatch={() => {}} state={{ test: 2 }} property="test" />);

  expect(screen.getByRole("spinbutton").value).toEqual("2");
});

test("Calls dispatcher on change.", () => {
  const fn = jest.fn();

  render(<Number onDispatch={fn} state={{ test: 0 }} property="test" />);

  userEvent.type(screen.getByRole("spinbutton"), "1");

  expect(fn).toHaveBeenCalledWith({ type: "test", value: 1 });
});
