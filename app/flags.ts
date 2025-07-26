export function getFlagsFromParams(searchParams: SearchParams) {
  const showPrivateImages = searchParams.howzit === 'true';

  return {
    showPrivateImages,
  };
}

export type SearchParams = {
  [key: string]: string | string[];
}