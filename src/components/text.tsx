import { FormEventHandler, useEffect, useRef, useState } from 'react';

export const Text = ({
  ariaDescribedby,
  ariaLabel,
  onChange,
  onValidity = () => undefined,
  value,
}: {
  ariaDescribedby?: string;
  ariaLabel?: string;
  onChange: (value: string) => void;
  onValidity?: (validationMessage?: string) => void;
  value: string;
}) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const input = useRef<HTMLInputElement>(null);
  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    setLocalValue(event.currentTarget.value);

    if (event.currentTarget.validity.valid) {
      onChange(event.currentTarget.value);
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
      onChange={handleChange}
      onKeyDown={(event) =>
        event.nativeEvent.key === 'Enter' && input.current?.blur()
      }
      placeholder={ariaLabel}
      ref={input}
      required
      type="text"
      value={localValue}
    />
  );
};
