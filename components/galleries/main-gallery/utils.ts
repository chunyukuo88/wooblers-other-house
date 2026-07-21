export function createEmptyCaptionsFile(photosLength: number) {
  const result = [];
  for (let i = 0; i < photosLength; i++) {
    result.push('@');
  }
  return result;
}

const separator = '@';
export function createNewCaptions(
  oldCaptions: string[],
  newCaption: string,
  index: number,
  photosLength: number,
): string[] {
  const allCaptionsForThisAlbum = oldCaptions.length
    ? oldCaptions
    : createEmptyCaptionsFile(photosLength);
  const targetCaption = allCaptionsForThisAlbum[index];
  const targetCaptionAsArray = targetCaption.split(separator);
  targetCaptionAsArray.pop();
  targetCaptionAsArray.push(newCaption);
  const updated = targetCaptionAsArray.join(separator);
  allCaptionsForThisAlbum.splice(index, 1, updated);
  return allCaptionsForThisAlbum;
}
