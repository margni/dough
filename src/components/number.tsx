import { FormEventHandler, useEffect, useRef, useState } from 'react';

import styles from './number.module.css';

export const Number = ({
  ariaDescribedby,
  ariaLabel,
  max,
  min = '0',
  onChange,
  onValidity = () => undefined,
  readOnly = false,
  step = 'any',
  value,
}: {
  ariaDescribedby?: string;
  ariaLabel?: string;
  max?: string;
  min?: string;
  onChange: (number: number) => void;
  onValidity?: (validity?: string) => void;
  readOnly?: boolean;
  step?: string;
  value: number;
}) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const input = useRef<HTMLInputElement>(null);
  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    setLocalValue(event.currentTarget.value);

    if (
      event.currentTarget.validity.valid &&
      !isNaN(+event.currentTarget.value)
    ) {
      onChange(+event.currentTarget.value);
      onValidity();
    } else {
      onValidity(event.currentTarget.validationMessage);
    }
  };

  useEffect(() => setLocalValue(value.toString()), [value]);

  return (
    <input
      aria-describedby={ariaDescribedby}
      aria-invalid={!input.current?.validity.valid}
      aria-label={ariaLabel}
      className={styles.host}
      max={max}
      min={min}
      onChange={handleChange}
      onKeyDown={(event) =>
        event.nativeEvent.key === 'Enter' && input.current?.blur()
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
