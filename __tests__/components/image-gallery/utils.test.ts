import {updateWithNewCaption} from "@/components/image-gallery/utils";

describe('GIVEN: an array of caption strings, a new caption, and an index,', () => {
  describe('WHEN: the function is executed,', () => {
    test('THEN: returns a new caption array with the updated caption.', () => {
      const oldCaptions = [
        "IMG1@a",
        "IMG2@@b",
        "IMG3@c"
      ];
      const newCaption = "UPDATED";
      const index = 1;
      const expectedNewCaptions = [
        "IMG1@a",
        "IMG2@@UPDATED",
        "IMG3@c"
      ];

      const result = updateWithNewCaption(oldCaptions, newCaption, index);

      expect(result).toEqual(expectedNewCaptions);
    });
  });
});