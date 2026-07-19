type ImageCardProps = {
  caption: string;
  bucketAlias: 'private' | 'public';
  hasShoppingCart?: boolean;
  index: number;
  red: number;
  green: number;
  blue: number;
};

export type SingleCardProps = ImageCardProps & {
  captions: string[];
  file: string;
};

export type RGB = {
  red: number;
  green: number;
  blue: number;
};
