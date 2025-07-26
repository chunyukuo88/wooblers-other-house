import {BucketItem} from "../../store/types";

export const GALLERY_BUCKETS = {
  BREAD: process.env.NEXT_PUBLIC_BUCKET_BREAD as string,
  MAIN_PRIVATE: process.env.NEXT_PUBLIC_BUCKET_MAIN_PRIVATE as string,
  MAIN_PUBLIC: process.env.NEXT_PUBLIC_BUCKET_MAIN_PUBLIC as string,
};

type ImageCardProps = {
  caption: string;
  galleryPrefix: string;
  hasShoppingCart?: boolean;
  index: number;
}

export type SingleCardProps = ImageCardProps & {
  file: string | { key: string };
};

export type StackedCardProps = ImageCardProps & {
  bucketItems: BucketItem[];
};

