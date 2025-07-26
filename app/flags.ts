export function getFlagsFromParams(howzit: string) {
  const showPrivateImages = howzit === 'true';

  return {
    showPrivateImages,
  };
}
