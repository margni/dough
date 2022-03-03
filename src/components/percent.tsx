import { round } from '../helpers/round';

export const Percent = ({
  value,
  decimals = 1,
}: {
  value: number;
  decimals?: number;
}) => <>{round(value * 100, decimals)}%</>;
