import { handleShare } from '../utils';

const setUpWindowLocation = async (href: string): Promise<void> => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = { href };
};
const setUpNavigatorShare = async (): Promise<void> => {
  delete global.navigator;
  global.navigator = {
    share: jest.fn(),
  };
};
const setUpNavigatorClipboardWriteText = async (): Promise<void> => {
  const mockWriteText = jest.fn();
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
};

afterEach(() => jest.clearAllMocks());

describe('handleShare()', () => {
  describe('WHEN: the user is viewing public images', () => {
    const theUrl = 'https://www.wooblers-other-house.com/?album=onomichi-trip';

    describe('WHEN: user clicks share button,', () => {
      describe('AND: the device allows use of the Navigator API share() method', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", async () => {
          await setUpWindowLocation(theUrl);
          await setUpNavigatorShare();

          const spy = jest.spyOn(global.navigator, 'share');

          await handleShare(jest.fn());

          expect(spy).toHaveBeenCalledWith({ url: theUrl });
        });
      });
      describe('AND: the device does NOT allow the Navigator API share() method,', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", async () => {
          await setUpWindowLocation(theUrl);
          await setUpNavigatorClipboardWriteText();

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
        it("THEN: copies the URL to the user's clipboard as is.", async () => {
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?${flag}=${value}&album=onomichi-trip`;

          await setUpWindowLocation(urlWithFlag);
          await setUpNavigatorClipboardWriteText();

          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare(jest.fn());

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
    describe('AND: the private image feature flag is NOT in the URL (it is in cookies instead)', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: adds the flag in before copying the URL to the user's clipboard.", async () => {
          const urlWithoutFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip`;
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip&${flag}=${value}`;

          await setUpWindowLocation(urlWithoutFlag);
          await setUpNavigatorClipboardWriteText();
          delete global.document.cookie;
          global.document = Object.create(document);
          Object.defineProperty(document, 'cookie', {
            configurable: true,
            get: () => `${flag}=${value}`,
            set: jest.fn(),
          });
          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare(jest.fn());

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
    describe('AND: the private image feature flag is among many cookies', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: adds the flag in before copying the URL to the user's clipboard.", async () => {
          const urlWithoutFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip`;
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip&${flag}=${value}`;

          await setUpWindowLocation(urlWithoutFlag);
          await setUpNavigatorClipboardWriteText();
          delete global.document.cookie;
          global.document = Object.create(document);
          Object.defineProperty(document, 'cookie', {
            configurable: true,
            get: () =>
              `_ga=GA1.1.1024119243.1763168709; _ga_9MSJV2CGHW=GS2.1.s1778896719$o31$g1$t1778900238$j60$l0$h0; ${flag}=${value}; __next_hmr_refresh_hash__=201`,
            set: jest.fn(),
          });
          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare(jest.fn());

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
  });
});
