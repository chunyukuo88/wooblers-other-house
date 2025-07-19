"use client";
import {
  createContext,
  useState,
  type PropsWithChildren,
  useContext,
  useEffect
} from "react";
import {Folder} from "./types";
import {useQuery} from "@tanstack/react-query";
import {getMainPageImages, queryKeys} from "../common/http";
import {errorLogger} from "../common/logging";

export const FetchedImagesContextV2 = createContext({
  fetchedFolders: [] as Folder[],
  updateFetchedFolders: function(folders: Folder[]){}
});

export function FetchedImagesV2Provider(props: PropsWithChildren){
  const {error, isLoading, isSuccess, data} = useQuery({
    queryKey: [queryKeys.GET_MAIN_PAGE_IMAGES],
    queryFn: getMainPageImages,
    refetchOnMount: false,
  });

  const folders: Folder[] = data ?? [];

  console.log('Provider / data')
  console.log(data)

  const getEm = () => {};

  return (
    // @ts-ignore
    <FetchedImagesContextV2.Provider value={{ fetchedFolders: folders, updateFetchedFolders: getEm}}>
      {props.children}
    </FetchedImagesContextV2.Provider>
  );
}

export function useMainImages() {
  return useContext(FetchedImagesContextV2);
}