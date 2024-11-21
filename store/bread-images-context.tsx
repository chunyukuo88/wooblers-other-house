"use client";
import { createContext, useState, type PropsWithChildren } from 'react';
import {BucketItem} from "./types";

type BreadImagesContextType = {
  fetchedBreadImages: BucketItem[];
  updateBreadImages: (images: BucketItem[]) => void;
};

export const BreadImagesContext = createContext<BreadImagesContextType>({
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
    // @ts-ignore
    <BreadImagesContext.Provider value={context}>
      {props.children}
    </BreadImagesContext.Provider>
  );
}