import { useEffect, useRef, useState } from 'react';

export const Number = ({
  max,
  min = '0',
  modifier = 1,
  onChange,
  readOnly,
  step = 'any',
  value,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const input = useRef();

  useEffect(() => {
    setLocalValue((value * modifier).toString());
  }, [modifier, value]);

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
          onChange(event.currentTarget.value / modifier);
        }
      }}
      onKeyDown={(event) =>
        event.nativeEvent.key === 'Enter' && input.current.blur()
      }
      readOnly={readOnly}
      ref={input}
      required
      step={step}
      type="number"
      value={localValue}
    />
  );
};
