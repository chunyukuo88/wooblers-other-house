import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import {BucketItem} from "../../../store/types";

describe('groupByRepetition()', () => {
  describe('GIVEN: an array of image objects from the back end', () => {
    describe('WHEN: there are NO duplicates', () => {
      test('THEN: returns an alphabetized array of image urls', () => {
        const [baguette, croissant, boule] = [
          "https://the-bucket.s3.amazonaws.com/baguette.jpg",
          "https://the-bucket.s3.amazonaws.com/croissant.jpg",
          "https://the-bucket.s3.amazonaws.com/boule.jpg",
        ];
        const images: BucketItem[] = [
          {key: "baguette.jpg", lastModified: "", size: 123, url: baguette},
          {key: "croissant.jpg", lastModified: "", size: 234, url: croissant},
          {key: "boule.jpg", lastModified: "", size: 345, url: boule},
        ];

        const expected = [baguette, boule, croissant];

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
    describe('WHEN: there ARE duplicates', () => {
      test('THEN: returns an alphabetized array of both url arrays and url strings', () => {
        const images: BucketItem[] = [
          {key: "baguette_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_a.jpg"},
          {key: "apple_pie.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/apple_pie.jpg"},
          {key: "fun_croissant_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_a.jpg"},
          {key: "baguette_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"},
          {key: "haunted_bread.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/haunted_bread.jpg"},
          {key: "fun_croissant_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_b.jpg"},
          {key: "wochebrot.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/wochebrot.jpg"},
        ];

        const expected = [
          "https://the-bucket.s3.amazonaws.com/apple_pie.jpg",
          ["https://the-bucket.s3.amazonaws.com/baguette_a.jpg", "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"],
          ["https://the-bucket.s3.amazonaws.com/fun_croissant_a.jpg", "https://the-bucket.s3.amazonaws.com/fun_croissant_b.jpg"],
          "https://the-bucket.s3.amazonaws.com/haunted_bread.jpg",
          "https://the-bucket.s3.amazonaws.com/wochebrot.jpg",
        ];

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
  });
});
