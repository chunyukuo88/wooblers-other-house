type FontCalculationArgs = {
  sumOfColors: number;
  red: number;
  green: number;
  blue: number;
}

const calculateFontColor = (args: FontCalculationArgs):string|undefined => {
  const {sumOfColors, red, green, blue} = args;
  return (sumOfColors < 250)
    ? `rgb(${red + 70 }, ${green + 70}, ${blue + 70})`
    : undefined;
};

export { calculateFontColor };
