const rulesetValues = {
  2: { rotations: [-15, 15], margins: [100, -100]},
  3: { rotations: [-15, 1, 15], margins: [-200, 0, 200]},
  4: { rotations: [-15, -5, 5, 15], margins: [-200, -100, 100, 200]},
  5: {rotations: [-20, -10, 0, 10, 20],  margins: [-200, -100, 0, 100, 200]},
  6: {rotations: [25, -13, -2, 2, 13, 25],  margins: [-200, -100, -50, 50, 100, 200]},
  7: {rotations: [25, -13, -2, 0, 2, 13, 25],  margins: [-200, -100, -50, 0, 50, 100, 200]},
};

export function calculateStyle (arrayOfUrls: string[], i: number) {
    return {
      transform:  `rotate(${rulesetValues[arrayOfUrls.length].rotations[i - 1]}deg)`,
      marginRight: `${rulesetValues[arrayOfUrls.length].margins[i - 1]}px`,
      justifySelf: "center"
    };
};