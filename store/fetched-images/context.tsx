'use client';
import { createContext, type PropsWithChildren, useReducer, useContext, ReactElement } from 'react';
import { Folder } from './types';
import {
  currentFolderReducer,
  fetchedFoldersReducer,
  initialCurrentFolder,
  initialFetchedImagesState,
} from './reducer';
import { setCurrentFolder, setFetchedFolders } from './actions';

type FetchedImagesContextType = {
  currentFolder: Folder;
  fetchedFolders: Folder[];
  updateCurrentFolder: (newFolder: Folder) => void;
  updateFetchedFolders: (folders: Folder[]) => void;
};

export const FetchedImagesContext = createContext<FetchedImagesContextType>({
  currentFolder: initialCurrentFolder,
  fetchedFolders: initialFetchedImagesState,
  updateCurrentFolder: () => {},
  updateFetchedFolders: () => {},
});

export function FetchedImagesV2Provider(props: PropsWithChildren): ReactElement {
  const [currentFolderState, dispatchCurrent] = useReducer(
    currentFolderReducer,
    initialCurrentFolder,
  );
  const [fetchedFoldersState, dispatchFetched] = useReducer(
    fetchedFoldersReducer,
    initialFetchedImagesState,
  );

  const contextValue: FetchedImagesContextType = {
    currentFolder: currentFolderState,
    fetchedFolders: fetchedFoldersState,
    updateCurrentFolder: (folder) => {
      dispatchCurrent(setCurrentFolder(folder));
    },
    updateFetchedFolders: (folders) => {
      dispatchFetched(setFetchedFolders(folders));
    },
  };

  return (
    <FetchedImagesContext.Provider value={contextValue}>
      {props.children}
    </FetchedImagesContext.Provider>
  );
}

export function useMainImages(): FetchedImagesContextType {
  return useContext(FetchedImagesContext);
}
