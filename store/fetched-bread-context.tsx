"use client";
import {createContext, type PropsWithChildren, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {getBreadImages, queryKeys} from "../common/http";

export const FetchedBreadContext = createContext({
  fetchedBreadImages: [],
  error: null,
  isSuccess: false,
  isLoading: false,
  data: false,
});

export function FetchedBreadContextProvider(props: PropsWithChildren){
  const {error, isLoading, isSuccess, data} = useQuery({
    queryKey: [queryKeys.GET_BREAD_IMAGES],
    queryFn: getBreadImages,
    refetchOnMount: false,
  });

  const contextValue = {
    fetchedBreadImages: data ?? [],
    error,
    isLoading,
    isSuccess,
  };

  return (
    // @ts-ignore
    <FetchedBreadContext.Provider value={contextValue}>
      {props.children}
    </FetchedBreadContext.Provider>
  );
}

export function useBreadImages() {
  return useContext(FetchedBreadContext);
}