export const updateUrl = (asQueryParams: string): void => {
  const newParams = new URLSearchParams(window.location.search);
  newParams.set('album', asQueryParams);
  const newUrl = `/?${newParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

export const handleShare = async (setCopied: (hasBeenCopied: boolean) => void): Promise<void> => {
  const baseUrl = window.location.href;
  const url = buildUrl(baseUrl);
  if (navigator.share) {
    await navigator.share({ url });
  } else {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2_000);
  }
};

const buildUrl = (baseUrl: string): string => {
  const flag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
  const value = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL!;
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
