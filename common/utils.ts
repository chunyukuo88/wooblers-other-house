type FontCalculationArgs = {
  sum: number;
  red: number;
  green: number;
  blue: number;
}

const calculateFontColor = (args: FontCalculationArgs):string => {
  const {sum, red, green, blue} = args;
  return (sum < 250)
    ? `rgb(${red + 70 }, ${green + 70}, ${blue + 70})`
    : "black";
};

export {calculateFontColor};
