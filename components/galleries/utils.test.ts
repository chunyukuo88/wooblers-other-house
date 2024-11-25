import {calculateStyle} from "./utils";

describe("calculateStyle/2", () => {
  describe("GIVEN: an array of urls and an index", () => {
    describe.each`
      index   | rotation 
      ${1}    | ${10}    
      ${2}    | ${15}    
    `("WHEN: there are 2 urls in the array,", ({index, rotation}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(2).fill("www.example.com/image.jpg");

          const expected = {
            transform:  `rotate(${rotation}deg)`,
          };

          const result = calculateStyle(arrayOfUrls, index);

          expect(result).toEqual(expected);
        });
      });
    });
    describe.each`
      index   | rotation
      ${1}    | ${-15}  
      ${2}    | ${1}    
      ${3}    | ${15}   
    `("WHEN: there are 3 urls in the array,", ({index, rotation, margin}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(3).fill("www.example.com/image.jpg");

          const expected = {
            transform:  `rotate(${rotation}deg)`,
          };

          const result = calculateStyle(arrayOfUrls, index);

          expect(result).toEqual(expected);
        });
      });
    });
    describe.each`
      index   | rotation
      ${0}    | ${-15}  
      ${1}    | ${-5}   
      ${2}    | ${5}    
      ${3}    | ${15}   
    `("WHEN: there are 4 urls in the array,", ({index, rotation}) => {
      describe(`AND: index equals ${index},`, () => {
        it(`THEN: returns a CSS object for card number ${index}`, () => {
          const arrayOfUrls = Array(4).fill("");

          const expected = {
            transform:  `rotate(${rotation}deg)`,
          };

          const result = calculateStyle(arrayOfUrls, index);

          expect(result).toEqual(expected);
        });
      });
    });
  });
});