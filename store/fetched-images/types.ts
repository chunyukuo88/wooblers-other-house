export enum CurrentFolderActionType {
  SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER',
}

export interface CurrentFolderAction {
  type: CurrentFolderActionType;
  payload: Folder;
}

export interface CurrentFolderState {
  friendlyName: string;
  name: string;
  photos: string[];
  captions: string[];
}

export enum FetchedFoldersActionType {
  SET_FETCHED_FOLDERS = 'SET_FETCHED_FOLDERS',
}

export interface FetchedFoldersAction {
  type: FetchedFoldersActionType;
  payload: Folder[];
}

export type FetchedFoldersState = Folder[];

export const emptyFolder = {
  friendlyName: '',
  name: '',
  photos: [],
  captions: [],
};

export type Folder = {
  friendlyName: string;
  name: string;
  photos: string[];
  captions: string[];
};
