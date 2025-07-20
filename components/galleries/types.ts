import {BucketItem} from "../../store/types";

export const GALLERY_BUCKETS = {
  BREAD: process.env.NEXT_PUBLIC_BUCKET_BREAD as string,
  MAIN: process.env.NEXT_PUBLIC_BUCKET_MAIN as string,
}

type ImageCardProps = {
  caption: string;
  galleryPrefix: string;
  hasShoppingCart?: boolean;
  index: number;
}

export type SingleCardProps = ImageCardProps & {
  file: string;
};

export type StackedCardProps = ImageCardProps & {
  bucketItems: BucketItem[];
};

