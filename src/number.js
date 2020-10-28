import { useEffect, useState } from 'react';

export const Number = ({ max, min = '0', onChange, step = 'any', value }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  return (
    <input
      max={max}
      min={min}
      onChange={(event) => {
        setLocalValue(event.currentTarget.value);

        // Only dispatch the value if its a valid number
        if (
          event.currentTarget.validity.valid &&
          event.currentTarget.value !== '' &&
          !isNaN(+event.currentTarget.value)
        ) {
          onChange(+event.currentTarget.value);
        }
      }}
      required
      step={step}
      type="number"
      value={localValue}
    />
  );
};
