"use client";
import { createContext, useState, type PropsWithChildren } from 'react';
import {BucketItem} from "./types";

export const BreadImagesContext = createContext({
  fetchedBreadImages: [],
  updateBreadImages: function (images: BucketItem[]) {},
});

export function BreadImagesProvider(props: PropsWithChildren){
  const [breadImages, setBreadImages] = useState<BucketItem[]>([]);

  function imageHandler(result: BucketItem[]) {
    setBreadImages(result);
  }

  const context = {
    fetchedBreadImages: breadImages,
    updateBreadImages: imageHandler,
  };

  return (
    <BreadImagesContext.Provider value={context}>
      {props.children}
    </BreadImagesContext.Provider>
  );
}