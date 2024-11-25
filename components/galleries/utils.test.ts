import {calculateStyle} from "./utils";

describe("calculateStyle/2", () => {
  describe("GIVEN: an array of urls and an index", () => {
    describe.each`
      index   | rotation | margin
      ${1}    | ${-15}   | ${100}
      ${2}    | ${15}    | ${-100}
    `("WHEN: there are 2 urls in the array,", ({index, rotation, margin}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(2).fill("www.example.com/image.jpg");

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
    describe.each`
      index   | rotation | margin
      ${1}    | ${-15}   | ${-200}
      ${2}    | ${1}     | ${0}
      ${3}    | ${15}    | ${200}
    `("WHEN: there are 3 urls in the array,", ({index, rotation, margin}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(3).fill("www.example.com/image.jpg");

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
    describe.each`
      index   | rotation | margin
      ${1}    | ${-15}   | ${-200}
      ${2}    | ${-5}    | ${-100}
      ${3}    | ${5}     | ${100}
      ${4}    | ${15}    | ${200}
    `("WHEN: there are 4 urls in the array,", ({index, rotation, margin}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(4).fill("");

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