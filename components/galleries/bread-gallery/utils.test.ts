import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import {BucketItem} from "../../../store/types";

describe('groupByRepetition()', () => {
  describe('GIVEN: an array of image objects from the back end', () => {
    describe('WHEN: there are NO duplicates', () => {
      test('THEN: returns an object with an array of image urls', () => {
        const [baguette, croissant, boule] = ["baguette.jpg","croissant.jpg","boule.jpg"];
        const images: BucketItem[] = [
          {key: "image1", lastModified: "", size: 123, url: "baguette.jpg"},
          {key: "image2", lastModified: "", size: 234, url: "croissant.jpg"},
          {key: "image3", lastModified: "", size: 345, url: "boule.jpg"},
        ];

        const expected = [baguette, croissant, boule];

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
    describe('WHEN: there ARE duplicates', () => {
      test('THEN: returns an object with an array of image url arrays', () => {

      });
    });
  });
});