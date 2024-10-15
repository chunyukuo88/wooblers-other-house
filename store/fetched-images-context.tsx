"use client";

import { createContext, useState, type PropsWithChildren } from 'react';

type Image= {
  key: string;
  lastModified: string;
  size: number;
  url: string;
}

export const FetchedImagesContext = createContext({
  fetchedImageObjects: [],
  updateFetchedImages: function(images: Image[]){},
});

export function FetchedImagesProvider(props: PropsWithChildren){
  const [fetchedImages, setImages] = useState<Image[]>([]);

  function handler(result: Image[]) {
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