import {BucketItem} from "../../store/types";

type ImageCardProps = {
  index: number;
  caption: string;
  hasShoppingCart?: boolean;
}

export type SingleCardProps = ImageCardProps & {
  file: BucketItem;
};

export type StackedCardProps = ImageCardProps & {
  bucketItems: BucketItem[];
};
