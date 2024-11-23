import {BucketItem} from "../../../store/types";

const isVariantOfSameBread = (image: BucketItem, itemUrl: string) => {
  const nameExtractedFromImage = trimLetterVariant(extractBreadName(image.url));
  const nameExtractedFromItem = trimLetterVariant(extractBreadName(itemUrl));
  return (nameExtractedFromImage === nameExtractedFromItem);
};

export function groupByRepetition(images: BucketItem[]): string[][] {
  const result = { singles: [], multiples: [] };
  const counts: any[] = [];

  images.forEach(image => {
    const match = counts.find(item => {
      return item.find((itemUrl: string) => isVariantOfSameBread(image, itemUrl));
    });
    if (match) { match.push(image.url) }
    else { counts.push([image.url]) }
  });

  counts.forEach((arr) => {
    if (arr.length > 1) { result.multiples.push(arr) }
    else { result.singles.push(arr) }
  });

  return [...result.singles.flat(), ...result.multiples];
}

export const trimLetterVariant = (breadNameWithVariant: string): string => {
  const asArray = breadNameWithVariant.split(" ");
  const endsWithVariantLetter = asArray[asArray.length - 1].length === 1;
  if (endsWithVariantLetter) {
    asArray.pop();
    return asArray.join(" ");
  }
  return asArray.join(" ");
};

/**
 * input:  "https://woobler-bread.s3.amazonaws.com/wochebrot_a.JPG"
 * output: "Wochebrot a"
 * */
export function extractBreadName(url: string): string {
  const split = url.split("/");
  const nameOfBread = split[split.length - 1];
  const removeExtension = nameOfBread.split(".")[0];
  const unifiedDelimiters = removeExtension.replaceAll("-", " ").replaceAll("_", " ");
  return unifiedDelimiters.charAt(0).toUpperCase() + unifiedDelimiters.slice(1);
}
