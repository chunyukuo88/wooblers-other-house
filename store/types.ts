export type BucketItem = {
  key: string;
  lastModified: string;
  size: number;
  url: string;
}

/**
 * For FetchedImagesContextV2
 * */
export type Folder = {
  friendlyName: string;
  name: string;
  photos: string[];
  captions: string[];
}
