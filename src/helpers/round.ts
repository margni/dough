export const round = (value: number | string, decimals = 0) =>
  Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
