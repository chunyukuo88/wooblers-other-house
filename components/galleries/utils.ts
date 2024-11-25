const rulesetValues = [
  {rotations: [-15, 15], margins: ["0 100px 0 0", "0", "0 -100px 0 0"]},
  {rotations: [-15, 1, 15], margins: ["0 -200px 0 0", 0, "0 200px 0 0"]},
  {
    rotations: [-15, -5, 5, 15],
    margins: ["0 -200px 0 0", "0 -100px 0 0", "0 100px 0 0", "0 200px 0 0"]
  },
  {
    rotations: [-20, -10, 0, 10, 20],
    margins: ["0 -200px 0 0", "0 -100px 0 0", "0 0px 0 0", "0 100px 0 0", "0 200px 0 0"]
  },
  {
    rotations: [25, -13, -2, 2, 13, 25],
    margins: ["0 -200px 0 0", "0 -100px 0 0", "0 -50px 0 0", "0 50px 0 0", "0 100px 0 0", "0 200px 0 0"]
  },
  {
    rotations: [25, -13, -2, 0, 2, 13, 25],
    margins: ["0 -200px 0 0", "0 -100px 0 0", "0 -50px 0 0", "0 0px 0 0", "0 50px 0 0", "0 100px 0 0", "0 200px 0 0"]
  }
];

export function calculateStyle (arrayOfUrls: string[], i: number) {
    return {
      transform:  `rotate(${rulesetValues[arrayOfUrls.length - 2].rotations[i - 1]}deg)`,
      margin: `${rulesetValues[arrayOfUrls.length - 2].margins[i - 1]}`,
      justifySelf: "center",
    };
}
