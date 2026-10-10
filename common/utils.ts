type FontCalculationArgs = {
  sum: number;
  red: number;
  green: number;
  blue: number;
};

type CalculatedGradient = {
  backgroundImage: string;
};

const buildColorGradient = (red: number, green: number, blue: number): CalculatedGradient => {
  const sum = red + green + blue;
  const gradientStart = `rgb(${red}, ${green}, ${blue})`;
  return {
    backgroundImage: `linear-gradient(${gradientStart}, white)`,
  };
};

const calculateFontColor = (args: FontCalculationArgs): string => {
  const { sum, red, green, blue } = args;
  return sum < 250 ? `rgb(${red + 70}, ${green + 70}, ${blue + 70})` : 'black';
};

export { buildColorGradient, calculateFontColor };
