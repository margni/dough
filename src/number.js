import { useEffect, useState } from "react";

export const Number = ({
  max,
  min = "0",
  onDispatch,
  state,
  step = "any",
  property,
}) => {
  const [value, setValue] = useState(state[property]);

  useEffect(() => {
    // Always allow state updtes to override any local values
    if (state[property].toString() !== value) {
      setValue(state[property].toString());
    }
    // eslint-disable-next-line
  }, [state, property]);

  const handleChange = (event) => {
    setValue(event.currentTarget.value);

    // Only dispatch the value if its a valid number
    if (
      event.currentTarget.validity.valid &&
      event.currentTarget.value !== "" &&
      !isNaN(+event.currentTarget.value)
    ) {
      onDispatch({ type: property, value: +event.currentTarget.value });
    }
  };

  return (
    <input
      max={max}
      min={min}
      onChange={handleChange}
      required
      step={step}
      type="number"
      value={value}
    />
  );
};
