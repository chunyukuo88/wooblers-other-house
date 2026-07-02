import {
  emptyFolder,
  Folder,
  CurrentFolderActionType,
  CurrentFolderAction,
  CurrentFolderState,
  FetchedFoldersActionType,
  FetchedFoldersAction,
  FetchedFoldersState,
} from './types';

export const initialFetchedImagesState: Folder[] = [];

export const initialCurrentFolder = emptyFolder as Folder;

export const currentFolderReducer = (state: CurrentFolderState, action: CurrentFolderAction) => {
  switch (action.type) {
    case CurrentFolderActionType.SET_CURRENT_FOLDER: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const fetchedFoldersReducer = (state: FetchedFoldersState, action: FetchedFoldersAction) => {
  switch (action.type) {
    case FetchedFoldersActionType.SET_FETCHED_FOLDERS: {
      return action.payload;
    }
    default:
      return state;
  }
};
