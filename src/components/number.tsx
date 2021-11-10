import { FormEventHandler, useEffect, useRef, useState } from 'react';

export type Validity = Pick<
  ValidityState,
  'valid' | 'valueMissing' | 'rangeOverflow' | 'rangeUnderflow' | 'stepMismatch'
>;

export const Number = ({
  ariaDescribedby,
  max,
  min = '0',
  onChange,
  onInvalid = () => undefined,
  onValid = () => undefined,
  readOnly = false,
  step = 'any',
  value,
}: {
  ariaDescribedby?: string;
  max?: string;
  min?: string;
  onChange: (number: number) => void;
  onInvalid?: (validity: Validity) => void;
  onValid?: (validity: undefined) => void;
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
      onValid(undefined);
    } else {
      onInvalid({
        valid: false,
        valueMissing: event.currentTarget.validity.valueMissing,
        rangeUnderflow: event.currentTarget.validity.rangeUnderflow,
        rangeOverflow: event.currentTarget.validity.rangeOverflow,
        stepMismatch: event.currentTarget.validity.stepMismatch,
      });
    }
  };

  useEffect(() => setLocalValue(value.toString()), [value]);

  return (
    <input
      aria-describedby={ariaDescribedby}
      aria-invalid={!input.current?.validity.valid}
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
