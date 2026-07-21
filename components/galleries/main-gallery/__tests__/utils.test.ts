import { createEmptyCaptionsFile, createNewCaptions } from '../utils';

describe('Feature: Caption file management', () => {
  describe('Scenario: Creating an empty captions file', () => {
    describe('Given a requested number of photos', () => {
      it('Then creates one empty caption entry for every photo', () => {
        const result = createEmptyCaptionsFile(3);

        const expected = ['@', '@', '@'];

        expect(result).toEqual(expected);
      });

      it('Then returns an empty array when there are no photos', () => {
        const result = createEmptyCaptionsFile(0);

        const expected: string[] = [];

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('Feature: Creating new captions', () => {
    describe('Scenario: No captions file exists yet', () => {
      describe('Given an empty captions array', () => {
        describe('When a caption is added to a photo', () => {
          it('Then initializes the captions file and stores the new caption at the requested index', () => {
            const result = createNewCaptions([], 'Beach', 1, 3);

            const expected: string[] = ['@', '@Beach', '@'];

            expect(result).toStrictEqual(expected);
          });

          it('Then leaves all other photo captions empty', () => {
            const result = createNewCaptions([], 'Sunset', 2, 4);

            const expected = ['@', '@', '@Sunset', '@'];

            expect(result).toEqual(expected);
          });
        });
      });
    });

    describe('Scenario: A captions file already exists', () => {
      describe('Given existing captions', () => {
        describe('When replacing an empty caption', () => {
          it('Then updates only the targeted photo', () => {
            const captions = ['@', '@', '@'];

            const result = createNewCaptions(captions, 'Mountain', 0, 3);

            const expected = ['@Mountain', '@', '@'];

            expect(result).toEqual(expected);
          });
        });

        describe('When replacing an existing caption', () => {
          it('Then overwrites the previous caption', () => {
            const captions = ['@Old Caption', '@'];

            const result = createNewCaptions(captions, 'New Caption', 0, 2);

            const expected = ['@New Caption', '@'];

            expect(result).toEqual(expected);
          });
        });

        describe('When updating a caption', () => {
          it('Then mutates and returns the original array instance', () => {
            const captions = ['@', '@'];

            const result = createNewCaptions(captions, 'Vacation', 1, 2);
            const expected = ['@', '@Vacation'];

            expect(result).toEqual(expected);
          });
        });
      });
    });
  });
});
