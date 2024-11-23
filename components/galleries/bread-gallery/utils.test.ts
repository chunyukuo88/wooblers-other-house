import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import {BucketItem} from "../../../store/types";

describe('groupByRepetition()', () => {
  describe('GIVEN: an array of image objects from the back end', () => {
    describe('WHEN: there are NO duplicates', () => {
      test('THEN: returns an object with an array of image urls', () => {
        const [baguette, croissant, boule] = [
          "https://the-bucket.s3.amazonaws.com/baguette.jpg","croissant.jpg","boule.jpg",
          "https://the-bucket.s3.amazonaws.com/croissant.jpg",
          "https://the-bucket.s3.amazonaws.com/boule.jpg",
        ];
        const images: BucketItem[] = [
          {key: "baguette.jpg", lastModified: "", size: 123, url: baguette},
          {key: "croissant.jpg", lastModified: "", size: 234, url: croissant},
          {key: "boule.jpg", lastModified: "", size: 345, url: boule},
        ];

        const expected = {
          singles: [baguette, croissant, boule],
          multiples: [],
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
          singles: ["https://the-bucket.s3.amazonaws.com/boule.jpg"],
          multiples: [["https://the-bucket.s3.amazonaws.com/baguette_a.jpg", "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"]],
        };

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
  });
});