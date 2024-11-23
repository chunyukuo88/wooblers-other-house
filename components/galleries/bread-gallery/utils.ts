import {BucketItem} from "../../../store/types";

type GroupedImages = {
  singles: string[];
  multiples?: string[][];
}

const isVariantOfSameBread = (image: BucketItem, item: BucketItem) => {
  const nameExtractedFromImage = trimLetterVariant(extractBreadName(image.url));
  const nameExtractedFromItem = trimLetterVariant(extractBreadName(item.url));
  return (nameExtractedFromImage === nameExtractedFromItem);
}

export function groupByRepetition(images: BucketItem[]):GroupedImages {
  const result = { singles: [], multiples: [] };
  const counts: any[] = [];

  images.forEach(image => {
    const match = counts.find(item => {
      return item.find((url: string) => {
        const sameBread = (trimLetterVariant(extractBreadName(url)) === trimLetterVariant(extractBreadName(image.url)));
        return sameBread;
      });
    });
    if (match) {
      match.push(image.url)
    } else {
      counts.push([image.url]);
    }
  });
  counts.forEach((arr) => {
    if (arr.length > 1) {
      result.multiples.push(arr);
    } else {
      result.singles.push(arr);
    }
  });
  return {
    singles: result.singles.flat(),
    multiples: result.multiples,
  }
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