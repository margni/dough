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
  const water = hydration - (starter - starter / (1 + starterHydration));
  const total = 1 + water + salt + starter;

  const flourWeight = (ballWeight * ballNumber) / total;

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
    saltWeight: round(flourWeight * salt, rounding || 1),
    starterWeight: round(flourWeight * starter),
    waterWeight: round(flourWeight * water),
  };
};

const calculateWeight = (flourWeight, state) =>
  round((flourWeight * state.total) / state.ballNumber);

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
          ballWeight: calculateWeight(action.value, state),
        }),
        flourWeight: action.value,
      };

    case 'waterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.water, state),
        }),
        waterWeight: action.value,
      };

    case 'saltWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.salt, state),
        }),
        saltWeight: action.value,
      };

    case 'starterWeight':
      return {
        ...calculate({
          ...state,
          ballWeight: calculateWeight(action.value / state.starter, state),
        }),
        starterWeight: action.value,
      };

    /* istanbul ignore next */
    default:
      throw new Error();
  }
};
