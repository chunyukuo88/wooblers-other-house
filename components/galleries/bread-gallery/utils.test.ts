import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import {BucketItem} from "../../../store/types";

describe('groupByRepetition()', () => {
  describe('GIVEN: an array of image objects from the back end', () => {
    describe('WHEN: there are NO duplicates', () => {
      test('THEN: returns an object with an array of image urls', () => {
        const [baguette, croissant, boule] = ["baguette.jpg","croissant.jpg","boule.jpg"];
        const images: BucketItem[] = [
          {key: "baguette.jpg", lastModified: "", size: 123, url: "https://the-bucket.s3.amazonaws.com/baguette.jpg"},
          {key: "croissant.jpg", lastModified: "", size: 234, url: "https://the-bucket.s3.amazonaws.com/croissant.jpg"},
          {key: "boule.jpg", lastModified: "", size: 345, url: "https://the-bucket.s3.amazonaws.com/boule.jpg"},
        ];

        const expected = {
          singles: [baguette, croissant, boule]
        };

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
    describe('WHEN: there ARE duplicates', () => {
      test('THEN: returns an object with an array of image url arrays', () => {
        const images: BucketItem[] = [
          {key: "image1", lastModified: "", size: 123, url: "https://the-bucket.s3.amazonaws.com/baguette_a.jpg"},
          {key: "image2", lastModified: "", size: 234, url: "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"},
          {key: "image3", lastModified: "", size: 345, url: "https://the-bucket.s3.amazonaws.com/boule.jpg"},
        ];

        const expected = {
          singles: ["boule.jpg"],
          multiples: ["baguette_a.jpg", "baguette_b.jpg"],
        };

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
  });
});