"use client";
import {useQuery} from "@tanstack/react-query";
import {getBreadImages, queryKeys} from "../../../common/http";
import {ImageCard} from "@/components/galleries/image-card";
import {extractBreadName, groupByRepetition, trimLetterVariant} from "@/components/galleries/bread-gallery/utils";
import ImageCardStacked from "@/components/galleries/image-card-stacked";
import {BucketItem} from "../../../store/types";
import "../styles.css";

export default function BreadGallery(){
  const queryResult = useQuery({
    queryKey: [queryKeys.GET_BREAD_IMAGES],
    queryFn: getBreadImages,
    refetchOnMount: false,
  });

  if (queryResult.error) return <div>No bread today.</div>;
  if (queryResult.isLoading) return <div className="woh__bread-loading">Baking those lovely loaves...</div>;

  const groupedAndSorted = groupByRepetition(queryResult.data);

  const getClassName = (item: BucketItem | BucketItem[], index: number) =>
    (Array.isArray(item))
      ? `woh__bread-card-fan woh__fan-${index}`
      : `woh__bread-image-${index}`;

  const caption = (item: BucketItem) => trimLetterVariant(extractBreadName(item.url));

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {groupedAndSorted.map((item: any, index: number) => (
          <div className={getClassName(item, index)} key={index}>
            {(Array.isArray(item))
              ? <ImageCardStacked bucketItems={item} index={index} caption={caption(item[0])}/>
              : <ImageCard file={item} index={index} caption={caption(item)}/>
            }
          </div>
          )
        )}
      </div>
    </div>
  );
}
