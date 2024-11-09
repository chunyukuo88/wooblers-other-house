export type BucketItem = {
  key: string;
  lastModified: string;
  size: number;
  url: string;
}

/**
 * For local storage
 * */
export enum COLOR_LABELS {
  RED = "woh__red",
  BLUE = "woh__blue",
  GREEN = "woh__green",
}