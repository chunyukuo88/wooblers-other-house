import {
  AlbumActionType,
  AlbumFriendly,
  AlbumFriendlyAction,
  AlbumUrl,
  AlbumUrlAction,
} from './types';

export const setCurrentFriendly = (friendly: AlbumFriendly): AlbumFriendlyAction => ({
  type: AlbumActionType.SET_CURRENT_FRIENDLY,
  payload: friendly,
});

export const setCurrentAlbumUrl = (albumUrl: AlbumUrl): AlbumUrlAction => ({
  type: AlbumActionType.SET_CURRENT_ALBUM_URL,
  payload: albumUrl,
});
