import { createNewCaptions } from '@/components/galleries/main-gallery/utils';

describe('GIVEN: an array of caption strings, a new caption, and an index,', () => {
  describe('WHEN: the second caption is given an updated string,', () => {
    test('THEN: returns a new caption array with the new second caption.', () => {
      const oldCaptions = ['IMG1@a', 'IMG2@b', 'IMG3@c'];
      const newCaption = 'UPDATED';
      const index = 1;
      const photosLength = 3;
      const expectedNewCaptions = ['IMG1@a', `IMG2@${newCaption}`, 'IMG3@c'];

      const result = createNewCaptions(oldCaptions, newCaption, index, photosLength);

      expect(result).toEqual(expectedNewCaptions);
    });
  });
  describe('WHEN: the last of 6 captions is given an updated string,', () => {
    test('THEN: returns a new caption array with the new sixth caption.', () => {
      const oldCaptions = ['IMG1@a', 'IMG2@b', 'IMG3@c', 'IMG4@d', 'IMG5@e', 'IMG6@f'];
      const newCaption = 'UPDATED';
      const index = 5;
      const photosLength = 6;
      const expectedNewCaptions = [
        'IMG1@a',
        'IMG2@b',
        'IMG3@c',
        'IMG4@d',
        'IMG5@e',
        `IMG6@${newCaption}`,
      ];

      const result = createNewCaptions(oldCaptions, newCaption, index, photosLength);

      expect(result).toEqual(expectedNewCaptions);
    });
  });
});
