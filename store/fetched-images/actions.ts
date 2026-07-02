import {
  CurrentFolderAction,
  CurrentFolderActionType,
  FetchedFoldersAction,
  FetchedFoldersActionType,
  Folder,
} from './types';

export const setCurrentFolder = (folder: Folder): CurrentFolderAction => ({
  type: CurrentFolderActionType.SET_CURRENT_FOLDER,
  payload: folder,
});

export const setFetchedFolders = (folders: Folder[]): FetchedFoldersAction => ({
  type: FetchedFoldersActionType.SET_FETCHED_FOLDERS,
  payload: folders,
});
