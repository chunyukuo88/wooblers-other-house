export const updateUrl = (asQueryParams: string): void => {
  const newParams = new URLSearchParams(window.location.search);
  newParams.set('album', asQueryParams);
  const newUrl = `/?${newParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};
