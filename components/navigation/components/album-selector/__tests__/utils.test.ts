import { handleShare } from '../utils';

describe('handleShare()', () => {
  describe('WHEN: the user is viewing public images', () => {
    const theUrl = 'https://www.wooblers-other-house.com/?album=onomichi-trip';

    describe('WHEN: user clicks share button,', () => {
      describe('AND: the device allows use of the Navigator API share() method', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", async () => {
          delete global.window.location;
          global.window = Object.create(window);
          global.window.location = {
            href: theUrl,
          };

          delete global.navigator;
          global.navigator = {
            share: jest.fn(),
          };

          const spy = jest.spyOn(global.navigator, 'share');

          await handleShare();

          expect(spy).toHaveBeenCalledWith({ url: theUrl });
        });
      });
      describe('AND: the device does NOT allow the Navigator API share() method,', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", async () => {
          const mockWriteText = jest.fn();
          delete global.window.location;
          global.window = Object.create(window);
          global.window.location = {
            href: theUrl,
          };

          delete global.navigator.clipboard;
          global.navigator = Object.create(navigator);
          global.navigator.share = undefined;
          global.navigator.clipboard = {
            writeText: mockWriteText,
            read: jest.fn(),
            readText: jest.fn(),
            write: jest.fn(),
            addEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
            removeEventListener: jest.fn(),
          };

          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare();

          expect(writeTextSpy).toHaveBeenCalledWith(theUrl);
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
