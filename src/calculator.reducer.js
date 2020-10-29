const percent = (number, percent) => number * (percent * 0.01);

const starterWater = (starterWeight, starterHydration) =>
  starterWeight * (starterHydration * 0.005);

const rounding = 0;

const round = (value, decimals) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

export const calcWeights = ({
  ballNumber,
  flourWeight,
  water,
  starterHydration,
  salt,
  starter,
}) => {
  const starterWeight = percent(flourWeight, starter);
  const starterFlour =
    starterWeight - starterWater(starterWeight, starterHydration);
  const saltWeight = percent(flourWeight + starterFlour, salt);
  const waterWeight =
    percent(flourWeight + starterFlour, water) -
    starterWater(starterWeight, starterHydration);

  return {
    ballWeight: round(
      (flourWeight + waterWeight + starterWeight + saltWeight) / ballNumber,
      rounding
    ),
    ballNumber,
    water,
    starterHydration,
    salt,
    starter,
    flourWeight: round(flourWeight, rounding),
    waterWeight: round(waterWeight, rounding),
    starterWeight: round(starterWeight, rounding),
    saltWeight: round(saltWeight, rounding || 1),
  };
};

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'ballWeight':
      return {
        ...calcWeights({
          ...state,
          flourWeight: action.value * (state.flourWeight / state.ballWeight),
        }),
        ballWeight: action.value,
      };

    case 'ballNumber':
      return calcWeights({
        ...state,
        ballNumber: action.value,
        flourWeight: (state.flourWeight / state.ballNumber) * action.value,
      });

    case 'water':
    case 'starterHydration':
    case 'salt':
    case 'starter':
      return calcWeights({ ...state, [action.type]: action.value });

    case 'flourWeight':
      return {
        ...calcWeights({ ...state, flourWeight: action.value }),
        flourWeight: action.value,
      };

    case 'waterWeight':
      return {
        ...calcWeights({
          ...state,
          flourWeight:
            ((action.value +
              starterWater(state.starterWeight, state.starterHydration)) /
              state.water) *
            100,
        }),
        waterWeight: action.value,
      };

    case 'saltWeight':
      return {
        ...calcWeights({
          ...state,
          flourWeight: (action.value / state.salt) * 100,
        }),
        saltWeight: action.value,
      };

    case 'starterWeight':
      return {
        ...calcWeights({
          ...state,
          flourWeight: (action.value / state.starter) * 100,
        }),
        starterWeight: action.value,
      };

    default:
      throw new Error();
  }
};
