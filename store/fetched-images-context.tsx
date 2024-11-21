"use client";
import { createContext, useState, type PropsWithChildren } from "react";
import {BucketItem} from "./types";

export const FetchedImagesContext = createContext({
  fetchedImageObjects: [],
  fetchedCaptionStrings: [],
  updateFetchedImages: function(images: BucketItem[]){},
  updateFetchedCaptions: function(captions: string[]){},
});

export function FetchedImagesProvider(props: PropsWithChildren){
  const [fetchedImages, setImages] = useState<BucketItem[]>([]);
  const [fetchedCaptions, setCaptions] = useState<string[]>([]);

  function imageHandler(result: BucketItem[]) {
    setImages(result);
  }

  function captionHandler(result: string[]) {
    setCaptions(result);
  }

  const context = {
    fetchedImageObjects: fetchedImages,
    updateFetchedImages: imageHandler,
    fetchedCaptionStrings: fetchedCaptions,
    updateFetchedCaptions: captionHandler,
  };

  return (
    // @ts-ignore
    <FetchedImagesContext.Provider value={context}>
      {props.children}
    </FetchedImagesContext.Provider>
  );
}