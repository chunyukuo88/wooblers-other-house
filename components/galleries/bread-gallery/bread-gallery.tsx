"use client";
import {useQuery} from "@tanstack/react-query";
import {getBreadImages, queryKeys} from "../../../common/http";
import {ImageCard} from "@/components/galleries/image-card";
import {extractBreadName, groupByRepetition, trimLetterVariant} from "@/components/galleries/bread-gallery/utils";
import ImageCardStacked from "@/components/galleries/image-card-stacked";
import {BucketItem} from "../../../store/types";
import {GALLERY_BUCKETS} from "@/components/galleries/types";
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

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {groupedAndSorted.map((item: any, index: number) => <DisplayedImage item={item} index={index}/>)}
      </div>
    </div>
  );
}

const caption = (item: BucketItem) => trimLetterVariant(extractBreadName(item.url));

function DisplayedImage(props: DisplayedImageProps){
  const {item, index} = props;
  return (
    <div className={getClassName(item, index)} key={index}>
      {(Array.isArray(item))
        ? <ImageCardStacked
            bucketItems={item}
            index={index}
            caption={caption(item[0])}
            galleryPrefix={GALLERY_BUCKETS.BREAD}
          />
        : <ImageCard
          file={item}
          index={index}
          caption={caption(item)}
          galleryPrefix={GALLERY_BUCKETS.BREAD}
        />
      }
    </div>
  );
}

type DisplayedImageProps = {
  item: any;
  index: number;
}

const getClassName = (item: BucketItem | BucketItem[], index: number) =>
  (Array.isArray(item))
    ? `woh__bread-card-fan woh__fan-${index}`
    : `woh__bread-image-${index}`;

