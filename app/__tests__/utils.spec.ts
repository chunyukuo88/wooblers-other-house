import { convertAlbumParamToFriendly } from '../utils';

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
