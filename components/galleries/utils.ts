const rulesetValues = {
  2: {
    rotations: [-15, 15],
    margins: [100, -100],
  },
  3: {
    rotations: [-15, 1, 15],
    margins: [-200, 0, 200],
  }
};

export function calculateStyle (arrayOfUrls: string[], i: number) {
  if (arrayOfUrls.length === 2) {
    return {
      transform:  `rotate(${rulesetValues[arrayOfUrls.length].rotations[i - 1]}deg)`,
      marginRight: `${rulesetValues[arrayOfUrls.length].margins[i - 1]}px`,
      justifySelf: "center"
    };
  }
  if (arrayOfUrls.length === 3) {
    return {
      transform:  `rotate(${rulesetValues[arrayOfUrls.length].rotations[i - 1]}deg)`,
      marginRight: `${rulesetValues[arrayOfUrls.length].margins[i - 1]}px`,
      justifySelf: "center"
    };
  }
  if (arrayOfUrls.length === 4) {
    const rotations = [-15, -5, 5, 15];
    return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
  }
  if (arrayOfUrls.length === 5) {
    const rotations = [-15, -5, 0, 5, 15];
    return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
  }
  if (arrayOfUrls.length === 6) {
    const rotations = [-20, -10, -5, 5, 10, 20];
    return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
  }
  if (arrayOfUrls.length === 7) {
    const rotations = [-20, -10, -5, 0, 5, 10, 20];
    return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
  }
};