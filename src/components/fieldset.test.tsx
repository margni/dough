import { render } from '@testing-library/react';
import { test } from 'vitest';

import { Fieldset } from './fieldset';

test('Renders.', () => {
  render(<Fieldset legend="Legend">Form controls</Fieldset>);
});
