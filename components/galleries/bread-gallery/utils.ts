import {BucketItem} from "../../../store/types";

type GroupedImages = {
  singles: string[];
  multiples?: string[][];
}

export function groupByRepetition(images: BucketItem[]):GroupedImages {
  const singles = [];
  const multiples = [];
  images.forEach((image) => {

  });
}