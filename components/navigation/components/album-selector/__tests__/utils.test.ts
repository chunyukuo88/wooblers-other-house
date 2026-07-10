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

          await handleShare(jest.fn());

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

          await handleShare(jest.fn());

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
  describe('GIVEN: user is viewing private or public images', () => {
    describe('WHEN: the navigator.share() method is unavailable', () => {
      it('THEN: invokes the callback passed to this function twice', async () => {
        jest.useFakeTimers();

        const theUrl = 'https://www.wooblers-other-house.com/?album=onomichi-trip';
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
        // not needed after the navigator.share() method because the user dismisses that themselves;
        // but for simply writing text to the clipboard, that is ephemeral. We want a notification to disappear
        // then go away soon after, so the `setCopied` is for React local state.
        const setCopied = jest.fn();

        await handleShare(setCopied);

        expect(setCopied).toHaveBeenCalledTimes(1);
        expect(setCopied).toHaveBeenCalledWith(true);
        jest.advanceTimersByTime(2_000);

        expect(setCopied).toHaveBeenCalledTimes(2);
        expect(setCopied).toHaveBeenCalledWith(false);
      });
    });
  });
});
