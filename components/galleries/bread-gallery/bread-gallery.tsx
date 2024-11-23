"use client";
import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {errorLogger, getBreadImages, queryKeys} from "../../../common/http";
import {BreadImagesContext} from "../../../store/bread-images-context";
import BreadCaption from "@/components/galleries/bread-gallery/bread-caption";
import {ImageCard} from "@/components/galleries/image-card";
import {BucketItem} from "../../../store/types";
import "./bread-gallery.css";
import "../galleries.css";

export default function BreadGallery(){
  const {fetchedBreadImages, updateBreadImages} = useContext(BreadImagesContext);
  const queryResult = useQuery({
    queryKey: [queryKeys.GET_BREAD_IMAGES],
    queryFn: getBreadImages,
    refetchOnMount: false,
  });

  if (queryResult.error) return <div>No bread today.</div>;
  if (queryResult.isLoading) return <div>Baking those lovely loaves...</div>;
  if (queryResult.isSuccess) {
    try {
      console.log("queryResult.data");
      console.dir(queryResult.data);
      updateBreadImages(queryResult.data);
    } catch (e) {
      errorLogger("Error parsing images: ", e);
    }
  }

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {fetchedBreadImages.map((file: BucketItem, index) => {
          return (
            <div className={`woh__image-${index} woh__bread-card`} key={index}>
              <ImageCard file={file} index={index}/>
              <BreadCaption url={file.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
