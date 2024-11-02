type FontCalculationArgs = {
  sumOfColors: number;
  red: number;
  green: number;
  blue: number;
}

const calculateFontColor = (args: FontCalculationArgs):string => {
  const {sumOfColors, red, green, blue} = args;
  return (sumOfColors < 250)
    ? `rgb(${red + 70 }, ${green + 70}, ${blue + 70})`
    : "black";
};

export { calculateFontColor };
