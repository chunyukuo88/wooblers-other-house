import {} from '../utils';

describe('handleShare()', () => {
  describe('GIVEN: the user is viewing private images', () => {
    describe('WHEN: the user is viewing public images', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", () => {
          //
        });
      });
    });
  });
  describe('GIVEN: the user is viewing private images', () => {
    describe('AND: the private image feature flag is in the URL', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: copies the URL to the user's clipboard as is.", () => {
          //
        });
      });
    });
    describe('AND: the private image feature flag is NOT in the URL (in cookies)', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: adds the flag in before copying the URL to the user's clipboard.", () => {
          //
        });
      });
    });
  });
});
