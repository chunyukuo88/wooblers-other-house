import {BucketItem} from "../../../store/types";

const isVariantOfSameBread = (image: BucketItem, item: BucketItem) => {
  const extractedA = extractBreadName(image.url);
  const nameExtractedFromImage = trimLetterVariant(extractedA);
  const extractedB = extractBreadName(item.url);
  const nameExtractedFromItem = trimLetterVariant(extractedB);
  return (nameExtractedFromImage === nameExtractedFromItem);
};

type CombinedItem = string | string[];
function alphabetizeCombinedArrays(arr: string[][]): string[][] {
  return arr.sort((itemA: CombinedItem, itemB: CombinedItem) => {
    const a = (Array.isArray(itemA)) ? itemA[0] : itemA;
    const b = (Array.isArray(itemB)) ? itemB[0] : itemB;

    return a.url.localeCompare(b.url);
  });
}

export function groupByRepetition(images: BucketItem[]): string[][] {
  const result = {
    singles: [],
    multiples: [],
  };
  const counts: any[] = [];

  images.forEach(image => {
    const match = counts.find(item => {
      return (Array.isArray(item))
        ? item.find((img) => isVariantOfSameBread(img, image))
        : isVariantOfSameBread(item, image);
    });

    if (match) {
      match.push(image);
    }
    else {
      counts.push([image]);
    }
  });

  counts.forEach((arr) => {
    if (arr.length > 1) {
      result.multiples.push(arr);
    }
    else {
      result.singles.push(arr);
    }
  });

  const bothImagesAndImageArrays = [...result.singles.flat(), ...result.multiples];

  return alphabetizeCombinedArrays(bothImagesAndImageArrays);
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
