import { trackEvent, GA_EVENTS } from '@/analytics';

export const updateUrl = (asQueryParams: string): void => {
  const newParams = new URLSearchParams(window.location.search);
  newParams.set('album', asQueryParams);
  const newUrl = `/?${newParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

export const handleShare = async (): Promise<void> => {
  const baseUrl = window.location.href;
  const url = buildUrl(baseUrl);
  try {
    if (navigator.share) {
      await navigator.share({ url });
      trackEvent(GA_EVENTS.SHARING.SHARE_NATIVE);
    } else {
      await navigator.clipboard.writeText(url);
      trackEvent(GA_EVENTS.SHARING.SHARE_CLIPBOARD);
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'Abort Error') {
      return;
    }
    trackEvent(GA_EVENTS.SHARING.SHARE_FAILED);
  }
};

const buildUrl = (baseUrl: string): string => {
  const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
  const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_ON!;
  const flagAndValue = getPrivateImagesFlag(flag, value).split('=');
  if (!flagAndValue) {
    return baseUrl;
  }
  const url = new URL(baseUrl);
  const privateImagesViaUrl = url.searchParams.get(flag);
  const privateImagesViaCookie = flagAndValue[0] === flag && flagAndValue[1] === value;
  if (!privateImagesViaUrl && privateImagesViaCookie) {
    url.searchParams.set(flag, value);
    return url.toString();
  }
  return baseUrl;
};

const getPrivateImagesFlag = (flag: string, value: string) => {
  const soleCookie = `${flag}=${value}`;
  const storedCookies = document.cookie;
  if (storedCookies === soleCookie) {
    return soleCookie;
  }

  const cookies = document.cookie.split('; ').find((row) => row.startsWith(flag + '='));

  return cookies || '';
};
