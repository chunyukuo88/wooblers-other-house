import {BucketItem} from "../../store/types";

const rulesetValues = [
  {rotations: [-10, 10]},
  {rotations: [-15, 1, 15]},
  {rotations: [-15, -5, 5, 15]},
  {rotations: [-20, -10, 0, 10, 20]},
  {rotations: [-30, -20, -10, 0, 10, 20]},
  {rotations: [25, -13, -2, 0, 2, 13, 25]},
];

export function calculateStyle (arrayOfUrls: BucketItem[], i: number) {
  const ruleset = rulesetValues[arrayOfUrls.length - 2];
  const rotationInDegrees = ruleset.rotations[i];
  return {
    transform:  `rotate(${rotationInDegrees}deg)`,
  };
}
