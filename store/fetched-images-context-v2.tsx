"use client";
import {createContext, type PropsWithChildren, useContext} from "react";
import {Folder} from "./types";
import {useQuery} from "@tanstack/react-query";
import {getMainPageImages, queryKeys} from "../common/http";

export const FetchedImagesContextV2 = createContext({
  fetchedFolders: [] as Folder[],
  error: null,
  isSuccess: false,
  data: false,
});

export function FetchedImagesV2Provider(props: PropsWithChildren){
  const {error, isLoading, isSuccess, data} = useQuery({
    queryKey: [queryKeys.GET_MAIN_PAGE_IMAGES],
    queryFn: getMainPageImages,
    refetchOnMount: false,
  });

  const contextValue = {
    fetchedFolders: data ?? [],
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
