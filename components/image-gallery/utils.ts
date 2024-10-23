export function updateWithNewCaption(
  oldCaptions: string[],
  newCaption: string,
  index: number,
): string[] {
  const targetOldCaption = oldCaptions[index];
  const captionAsArray = targetOldCaption.split("@");
  captionAsArray.pop();
  captionAsArray.push(newCaption);
  const updatedCaption = captionAsArray.join("@");
  oldCaptions.splice(index, 1, updatedCaption);
  return oldCaptions;
}
