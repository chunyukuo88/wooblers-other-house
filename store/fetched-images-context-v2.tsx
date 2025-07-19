"use client";
import { createContext, useState, type PropsWithChildren } from "react";
import {Folder} from "./types";

export const FetchedImagesContextV2 = createContext({
  fetchedFolders: [] as Folder[],
  updateFetchedFolders: function(folders: Folder[]){}
});

export function FetchedImagesV2Provider(props: PropsWithChildren){
  const [fetchedFolders, setFolders] = useState<Folder[]>([]);

  function folderHandler(result: Folder[]){
    setFolders(result);
  }

  const context = {
    fetchedFolderObjects: fetchedFolders,
    updateFetchedFolders: folderHandler,
  };

  return (
    // @ts-ignore
    <FetchedImagesContextV2.Provider value={context}>
      {props.children}
    </FetchedImagesContextV2.Provider>
  );
}