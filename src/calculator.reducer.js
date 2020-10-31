const percent = (number, percent) => number * (percent * 0.01);

const rounding = 0;

const round = (value, decimals = rounding) =>
  Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

const calcStarter = ({ flourWeight, starter, starterHydration }) => {
  const starterWeight = percent(flourWeight, starter);
  const starterFlour = starterWeight / (1 + starterHydration / 100);

  return {
    starterWeight,
    starterFlour,
    starterWater: starterWeight - starterFlour,
    totalFlourWeight: flourWeight + starterFlour,
  };
};

export const calcWeights = ({
  ballNumber,
  flourWeight,
  water,
  starterHydration,
  salt,
  starter,
}) => {
  const starterCalculations = calcStarter({
    flourWeight,
    starter,
    starterHydration,
  });
  const saltWeight = percent(starterCalculations.totalFlourWeight, salt);
  const waterWeight =
    percent(starterCalculations.totalFlourWeight, water) -
    starterCalculations.starterWater;

  return {
    ballWeight: round(
      (flourWeight +
        starterCalculations.starterWeight +
        waterWeight +
        saltWeight) /
        ballNumber,
      rounding
    ),
    ballNumber,
    water,
    starterHydration,
    salt,
    starter,
    flourWeight: round(flourWeight),
    waterWeight: round(waterWeight),
    starterWeight: round(starterCalculations.starterWeight),
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

    // TODO Enable editing of water weight.
    // TODO Enable editing of salt weight.
    case 'waterWeight':
    case 'saltWeight':
      throw new Error(`${action.type} is not editable.`);

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
