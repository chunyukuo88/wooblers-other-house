import {calculateStyle} from "./utils";

describe("calculateStyle/2", () => {
  describe("GIVEN: an array of urls and an index", () => {
    describe.each`
      index   | rotation | margin
      ${1}    | ${-15}   | ${100}
      ${2}    | ${15}    | ${-100}
    `("WHEN: there are 2 urls in the array,", ({index, rotation, margin}) => {
      describe(`AND: index equals ${index},`, () => {
        it("THEN: returns a CSS object for the left card", () => {
          const arrayOfUrls = ["",""];

          const expected = {
            transform:  `rotate(${rotation}deg)`,
            marginRight: `${margin}px`,
            justifySelf: "center"
          };

          const result = calculateStyle(arrayOfUrls, index);

          expect(result).toEqual(expected);
        });
      });
    });
  });
});