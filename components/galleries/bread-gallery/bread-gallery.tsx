"use client";
import {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {errorLogger, getBreadImages, queryKeys} from "../../../common/http";
import {BreadImagesContext} from "../../../store/bread-images-context";
import {ImageCard} from "@/components/galleries/image-card";
import {groupByRepetition} from "@/components/galleries/bread-gallery/utils";
import ImageCardStacked from "@/components/galleries/image-card-stacked";
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
      updateBreadImages(queryResult.data);
    } catch (e) {
      errorLogger("Error parsing images: ", e);
    }
  }

  const groupedAndSorted = groupByRepetition(queryResult.data);

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {groupedAndSorted.map((item: BucketItem | BucketItem[], index) => {
          return (
            <div className={`woh__image-${index} woh__bread-card`} key={index}>
              {(Array.isArray(item))
                ? <ImageCardStacked arrayOfUrls={item} index={index}/>
                : <ImageCard file={item} index={index} caption={"item.url"}/>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
