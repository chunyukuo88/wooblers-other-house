"use client";

import { createContext, useState, type PropsWithChildren } from 'react';
import {BucketItem} from "./types";

export const FetchedImagesContext = createContext({
  fetchedImageObjects: [],
  updateFetchedImages: function(images: BucketItem[]){},
});

export function FetchedImagesProvider(props: PropsWithChildren){
  const [fetchedImages, setImages] = useState<BucketItem[]>([]);

  function handler(result: BucketItem[]) {
    setImages(result);
  }

  const context = {
    fetchedImageObjects: fetchedImages,
    updateFetchedImages: handler,
  };

  return (
    // @ts-ignore
    <FetchedImagesContext.Provider value={context}>
      {props.children}
    </FetchedImagesContext.Provider>
  );
}