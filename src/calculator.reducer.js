const rounding = 0;

const round = (value, decimals = rounding) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

export const calculate = ({
  ballWeight,
  ballNumber,
  hydration,
  salt,
  starter,
  starterHydration,
}) => {
  const starterPercent = starter * 0.01;
  const starterFlour = starterPercent / (1 + starterHydration * 0.01);
  const starterWater = starterPercent - starterFlour;
  const totalWeight = ballWeight * ballNumber;

  const water = hydration * 0.01 - starterWater;
  const total = 1 + water + salt * 0.01 + starter * 0.01;

  const flourWeight = totalWeight / total;
  const saltWeight = flourWeight * (salt * 0.01);
  const starterWeight = flourWeight * (starter * 0.01);
  const waterWeight = flourWeight * water;

  return {
    ballWeight,
    ballNumber,
    hydration,
    salt,
    starter,
    starterHydration,
    total,
    water,
    flourWeight: round(flourWeight),
    saltWeight: round(saltWeight, rounding || 1),
    starterWeight: round(starterWeight),
    waterWeight: round(waterWeight),
  };
};

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'ballWeight':
      return calculate({ ...state, ballWeight: action.value });

    case 'ballNumber':
      return calculate({ ...state, ballNumber: action.value });

    case 'hydration':
    case 'starterHydration':
    case 'salt':
    case 'starter':
      return calculate({ ...state, [action.type]: action.value });

    case 'flourWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: round((action.value * state.total) / state.ballNumber),
        }),
        flourWeight: action.value,
      };

    case 'waterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: round(
            ((action.value / state.water) * state.total) / state.ballNumber
          ),
        }),
        waterWeight: action.value,
      };

    case 'saltWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: round(
            ((action.value / (state.salt * 0.01)) * state.total) /
              state.ballNumber
          ),
        }),
        saltWeight: action.value,
      };

    case 'starterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: round(
            ((action.value / (state.starter * 0.01)) * state.total) /
              state.ballNumber
          ),
        }),
        starterWeight: action.value,
      };

    default:
      throw new Error();
  }
};
