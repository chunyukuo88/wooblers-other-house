export type AlbumUrl = string;
export type AlbumFriendly = string;

export enum AlbumActionType {
  SET_CURRENT_FRIENDLY = 'SET_CURRENT_FRIENDLY',
  SET_CURRENT_ALBUM_URL = 'SET_CURRENT_ALBUM_URL',
}

export interface AlbumUrlAction {
  type: AlbumActionType;
  payload: string;
}

export interface AlbumFriendlyAction {
  type: AlbumActionType;
  payload: string;
}
