import { AlbumActionType, AlbumFriendlyAction, AlbumUrlAction } from './types';

export const [initialFriendly, initialUrl] = ['', ''];

export const albumFriendlyReducer = (state: string, action: AlbumFriendlyAction) => {
  switch (action.type) {
    case AlbumActionType.SET_CURRENT_FRIENDLY: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const albumUrlReducer = (state: string, action: AlbumUrlAction) => {
  switch (action.type) {
    case AlbumActionType.SET_CURRENT_ALBUM_URL: {
      return action.payload;
    }
    default:
      return state;
  }
};
