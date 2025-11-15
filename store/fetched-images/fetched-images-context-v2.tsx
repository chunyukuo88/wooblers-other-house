"use client";
import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import {Folder} from "../types";

const emptyFolder = {
  friendlyName: "",
  name: "",
  photos: [],
  captions: [],
};

export const FetchedImagesContextV2 = createContext({
  fetchedFolders: [] as Folder[],
  currentFolder: emptyFolder as Folder,
  updateCurrentFolder: (newFolder: Folder) => {},
  updateFetchedFolders: (folders: Folder[]) => {},
});

export function FetchedImagesV2Provider(props: PropsWithChildren){
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
    currentFolder: currentFolder || emptyFolder as Folder,
    updateCurrentFolder: updateFolder,
    updateFetchedFolders: updateTheFolders,
  };

  return (
    // @ts-ignore
    <FetchedImagesContextV2.Provider value={contextValue}>
      {props.children}
    </FetchedImagesContextV2.Provider>
  );
}

export function useMainImages() {
  return useContext(FetchedImagesContextV2);
}
