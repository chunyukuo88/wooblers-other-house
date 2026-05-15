import {BucketItem} from "../../store/types";

type ImageCardProps = {
  caption: string;
  bucketAlias: 'private' | 'public';
  hasShoppingCart?: boolean;
  index: number;
}

export type SingleCardProps = ImageCardProps & {
  file: string;
};

export type StackedCardProps = ImageCardProps & {
  bucketItems: BucketItem[];
};
