const rulesetValues = [
  {// 2 cards
    rotations: [-15, 15],
  },
  {// 3 cards
    rotations: [-15, 1, 15],
  },
  {// 4 cards
    rotations: [-15, -5, 5, 15],
  },
  {// 5 cards
    rotations: [-20, -10, 0, 10, 20],
  },
  {// 6 cards
    rotations: [25, -13, -2, 2, 13, 125],
  },
  {// 7 cards
    rotations: [25, -13, -2, 0, 2, 13, 25],
  }
];

export function calculateStyle (arrayOfUrls: any[], i: number) {
  const ruleset = rulesetValues[arrayOfUrls.length - 2];

    return {
      transform:  `rotate(${ruleset.rotations[i]}deg)`,
    };
}
