export const updateUrl = (asQueryParams: string): void => {
  const newParams = new URLSearchParams(window.location.search);
  newParams.set('album', asQueryParams);
  const newUrl = `/?${newParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

export const handleShare = async (setCopied: (hasBeenCopied: boolean) => void) => {
  const baseUrl = window.location.href;
  if (navigator.share) {
    await navigator.share({ url: baseUrl });
  } else {
    await navigator.clipboard.writeText(baseUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2_000);
  }
};
