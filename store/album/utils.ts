/**
 *
 * */
export function convertFriendlyToQueryParam(friendlyName: string): string {
  const spacesToHyphens = friendlyName.split(' ').join('-').toLowerCase();
  return spacesToHyphens.replace('!', '%21');
}

/**
 * Contract: The only special char used by album params is exclamation marks.
 * @param searchParam the friendly album name, with URL conversions (such as for special chars)
 * @returns the friendly album name, without URL conversions
 * */
export function convertAlbumParamToFriendly(searchParam: string): string {
  if (!searchParam) {
    return '';
  }
  const hyphensToSpaces = searchParam.split('-').join(' ').toLowerCase();
  return hyphensToSpaces.replace('%21', '!');
}
