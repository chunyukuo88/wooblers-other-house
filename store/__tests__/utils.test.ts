import { convertAlbumParamToFriendly, convertFriendlyToQueryParam } from '../utils';

describe('utils', () => {
  describe('convertAlbumParamToFriendly()', () => {
    describe.each`
      searchParam
      ${null}
      ${undefined}
      ${''}
    `('WHEN: there is no album param', ({ searchParam }) => {
      it('THEN: returns an empty string', () => {
        const result = convertAlbumParamToFriendly(searchParam);

        expect(result).toEqual('');
      });
    });
    describe('WHEN: the album search param has hyphens', () => {
      it('THEN: returns the string in lowercase, with spaces instead of hyphens', () => {
        const searchParam = 'year-OF-the-Horse';
        const expected = 'year of the horse';

        const result = convertAlbumParamToFriendly(searchParam);

        expect(result).toEqual(expected);
      });
      describe('WHEN: the album search param has NO hyphens', () => {
        it('THEN: returns the string in lowercase', () => {
          const searchParam = 'birthdays';
          const expected = 'birthdays';

          const result = convertAlbumParamToFriendly(searchParam);

          expect(result).toEqual(expected);
        });
      });
      describe('WHEN: the album search param has the %21 URL encoding for exclamation mark', () => {
        it('THEN: returns the album name with exclamation mark instead', () => {
          const searchParam = 'autumn-arrives%21';
          const expected = 'autumn arrives!';

          const result = convertAlbumParamToFriendly(searchParam);

          expect(result).toEqual(expected);
        });
      });
    });
  });
  describe('convertFriendlyToQueryParam()', () => {
    describe('WHEN: passed a friendly name with a single word', () => {
      it('THEN: returns that word, in lowercase', () => {
        const friendlyName = 'Sourdough';
        const expected = 'sourdough';

        const result = convertFriendlyToQueryParam(friendlyName);

        expect(result).toEqual(expected);
      });
    });
    describe('WHEN: passed a friendly name with multiple words', () => {
      it('THEN: returns a query parameter with hyphens instead of spaces', () => {
        const friendlyName = 'Xmas 2025';
        const expected = 'xmas-2025';

        const result = convertFriendlyToQueryParam(friendlyName);

        expect(result).toEqual(expected);
      });
    });
    describe('WHEN: the friendly name has an exclamation mark', () => {
      it('THEN: returns a lowercase string with the %21 URL encoding for exclamation mark', () => {
        const friendlyName = 'Autumn arrives!';
        const expected = 'autumn-arrives%21';

        const result = convertFriendlyToQueryParam(friendlyName);

        expect(result).toEqual(expected);
      });
    });
  });
});
