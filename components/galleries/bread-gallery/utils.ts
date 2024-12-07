import {BucketItem} from "../../../store/types";
import {createHttpRequest} from "../../../common/http";
import {allPaths} from "../../../allPaths";
import {errorLogger, logger} from "../../../common/logging";

const isVariantOfSameBread = (image: BucketItem, item: BucketItem) => {
  const nameExtractedFromImage = trimLetterVariant(extractBreadName(image.url));
  const nameExtractedFromItem = trimLetterVariant(extractBreadName(item.url));
  return (nameExtractedFromImage === nameExtractedFromItem);
};

type CombinedItem = string | string[];
function alphabetizeCombinedArrays(arr: string[][]): string[][] {
  return arr.sort((itemA: CombinedItem, itemB: CombinedItem) => {
    const a = (Array.isArray(itemA)) ? itemA[0] : itemA;
    const b = (Array.isArray(itemB)) ? itemB[0] : itemB;
    // @ts-ignore
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
    const match = counts.find(item => (Array.isArray(item))
      ? item.find((img) => isVariantOfSameBread(img, image))
      : isVariantOfSameBread(item, image)
    );

    (match)
      ? match.push(image)
      : counts.push([image]);
  });

  counts.forEach((arr) => (arr.length > 1)
  // @ts-ignore
    ? result.multiples.push(arr)
  // @ts-ignore
    : result.singles.push(arr));

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

type SendEmailParams = {
  session: any;
  breadType: string;
  userEmail: string;
};

export function generateEmailData(breadType: string, userEmail: string) {
  return {
    subject: `${breadType} order from ${userEmail}`,
    message: `Bake me ${breadType} please. \nFrom ${userEmail}`,
    userEmail,
  };
}

export async function sendEmail(params: SendEmailParams):Promise<void> {
  const {session, breadType, userEmail} = params;
  const data = {
    subject: `${breadType} order from ${userEmail}`,
    message: `Bake me ${breadType} please. \nFrom ${userEmail}`,
    userEmail,
  };
  const req = createHttpRequest("POST", session.idToken, data);
  try {
    const response = await fetch(allPaths.EMAIL_API_ROUTE, req);
    const data = await response.json();
    if (!response.ok) {
      errorLogger("Failed to send email", data.error);
    }
    logger("Email sent successfully!");
  } catch (error) {
    errorLogger("Failed to send email", error);
  }
}
