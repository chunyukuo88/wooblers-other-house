import { handleShare } from '../utils';
import { trackEvent, GA_EVENTS } from '@/analytics';
import {
  setUpAbortedSharing,
  setUpCookies,
  setUpNavigatorClipboardWriteText,
  setUpNavigatorError,
  setUpNavigatorShare,
  setUpWindowLocation,
} from './fixtures';

jest.mock('../../../../../app/analytics');

beforeEach(() => {
  (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
});
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

          await handleShare();

          expect(spy).toHaveBeenCalledWith({ url: theUrl });
        });
      });
      describe('AND: the device does NOT allow the Navigator API share() method,', () => {
        it("THEN: copies the URL to the user's clipboard without modification.", async () => {
          await setUpWindowLocation(theUrl);
          await setUpNavigatorClipboardWriteText();

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
        it("THEN: copies the URL to the user's clipboard as is.", async () => {
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?${flag}=${value}&album=onomichi-trip`;

          await setUpWindowLocation(urlWithFlag);
          await setUpNavigatorClipboardWriteText();

          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare();

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
    describe('AND: the private image feature flag is NOT in the URL (it is in cookies instead)', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: adds the flag in before copying the URL to the user's clipboard.", async () => {
          const urlWithoutFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip`;
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip&${flag}=${value}`;

          const onlyPrivateImagesCookie = `${flag}=${value}`;
          setUpCookies(onlyPrivateImagesCookie);
          await setUpWindowLocation(urlWithoutFlag);
          await setUpNavigatorClipboardWriteText();

          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare();

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
    describe('AND: the private image feature flag is among many cookies', () => {
      describe('WHEN: the user clicks the share button', () => {
        it("THEN: adds the flag in before copying the URL to the user's clipboard.", async () => {
          const urlWithoutFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip`;
          const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
          const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;
          const urlWithFlag = `https://www.wooblers-other-house.com/?album=onomichi-trip&${flag}=${value}`;

          const multipleCookies = `_ga=GA1.1.1024119243.1763168709; _ga_9MSJV2CGHW=GS2.1.s1778896719$o31$g1$t1778900238$j60$l0$h0; ${flag}=${value}; __next_hmr_refresh_hash__=201`;
          setUpCookies(multipleCookies);
          await setUpWindowLocation(urlWithoutFlag);
          await setUpNavigatorClipboardWriteText();

          const writeTextSpy = jest.spyOn(global.navigator.clipboard, 'writeText');

          await handleShare();

          expect(writeTextSpy).toHaveBeenCalledWith(urlWithFlag);
        });
      });
    });
  });
  describe('SCENARIOS: Tracking', () => {
    const href = 'https://www.example.com';
    describe('WHEN: the user is able to share via the navigator share method', () => {
      it('THEN: tracks that action', async () => {
        await setUpWindowLocation(href);
        await setUpNavigatorShare();

        await handleShare();

        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.SHARING.SHARE_NATIVE);
      });
    });
    describe('WHEN: the user is able to share via the navigator clipboard method', () => {
      it('THEN: tracks that action', async () => {
        await setUpWindowLocation(href);
        await setUpNavigatorClipboardWriteText();

        await handleShare();

        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.SHARING.SHARE_CLIPBOARD);
      });
    });
    describe('WHEN: album sharing fails', () => {
      it('THEN: tracking reports that failure', async () => {
        await setUpWindowLocation(href);
        setUpNavigatorError();

        await handleShare();

        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.SHARING.SHARE_FAILED);
      });
    });
    describe('WHEN: user initiates sharing but then aborts it', () => {
      it('THEN: sends no further tracking', async () => {
        await setUpWindowLocation(href);
        setUpAbortedSharing();

        await handleShare();

        expect(trackEvent).not.toHaveBeenCalled();
      });
    });
  });
});
