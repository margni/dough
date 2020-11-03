import { useEffect, useRef, useState } from 'react';

export const Number = ({
  max,
  min = '0',
  onChange,
  readOnly,
  step = 'any',
  value,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const input = useRef();
  const handleChange = (event) => {
    setLocalValue(event.currentTarget.value);

    if (
      event.currentTarget.validity.valid &&
      !isNaN(+event.currentTarget.value)
    ) {
      onChange(+event.currentTarget.value);
    }
  };

  useEffect(() => setLocalValue(value.toString()), [value]);

  return (
    <input
      max={max}
      min={min}
      onChange={handleChange}
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
