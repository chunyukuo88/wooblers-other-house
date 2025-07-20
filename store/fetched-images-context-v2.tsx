"use client";
import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import {Folder} from "./types";
import {useQuery} from "@tanstack/react-query";
import {getMainPageImages, queryKeys} from "../common/http";

export const FetchedImagesContextV2 = createContext({
  fetchedFolders: [] as Folder[],
  currentFolder: {},
  updateCurrentFolder: (newFolder: Folder) => {},
  error: null,
  isSuccess: false,
  data: false,
});

export function FetchedImagesV2Provider(props: PropsWithChildren){
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const {error, isLoading, isSuccess, data} = useQuery({
    queryKey: [queryKeys.GET_MAIN_PAGE_IMAGES],
    queryFn: getMainPageImages,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data) {
      setCurrentFolder(data[0]);
    }
  }, [data]);

  function updateFolder(newFolder: Folder) {
    setCurrentFolder(newFolder);
  }

  const contextValue = {
    fetchedFolders: data ?? [],
    currentFolder,
    updateCurrentFolder: updateFolder,
    error,
    isLoading,
    isSuccess,
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
