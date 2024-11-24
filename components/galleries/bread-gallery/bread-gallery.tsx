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
import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import ImageCardStacked from "@/components/galleries/image-card-stacked";

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
      updateBreadImages(queryResult.data);
    } catch (e) {
      errorLogger("Error parsing images: ", e);
    }
  }

  const groupedAndSorted = groupByRepetition(queryResult.data);

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {groupedAndSorted.map((item: string | string[], index) => {
          return (
            <div className={`woh__image-${index} woh__bread-card`} key={index}>
              {(typeof item === "string")
                ? <ImageCard file={item} index={index}/>
                : <ImageCardStacked arrayOfUrls={item} index={index}/>
              }

              {/*<BreadCaption url={file.url} />*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}
