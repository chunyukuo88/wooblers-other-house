'use client';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import { Folder } from './types';
import { emptyFolder } from './types';
import { initialCurrentFolder, initialFetchedImagesState } from './reducer';
import { setCurrentFolder, setFetchedFolders } from './actions';

export const FetchedImagesContext = createContext({
  ...initialCurrentFolder,
  ...initialFetchedImagesState,
  updateCurrentFolder: (newFolder: Folder) => {},
  updateFetchedFolders: (folders: Folder[]) => {},
});

export function FetchedImagesV2Provider(props: PropsWithChildren) {
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [fetched, setFetched] = useState<Folder[]>([]);

  function updateFolder(newFolder: Folder) {
    setCurrentFolder(newFolder);
  }

  function updateTheFolders(folders: Folder[]) {
    setFetched(folders);
  }

  const contextValue = {
    fetchedFolders: fetched || [],
    currentFolder: currentFolder || (emptyFolder as Folder),
    updateCurrentFolder: updateFolder,
    updateFetchedFolders: updateTheFolders,
  };

  return (
    // @ts-ignore
    <FetchedImagesContext.Provider value={contextValue}>
      {props.children}
    </FetchedImagesContext.Provider>
  );
}

export function useMainImages() {
  return useContext(FetchedImagesContext);
}
