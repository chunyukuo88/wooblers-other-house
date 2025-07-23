"use client";
import {ImageCard} from "@/components/galleries/image-card";
import {extractBreadName, groupByRepetition, trimLetterVariant} from "@/components/galleries/bread-gallery/utils";
import ImageCardStacked from "@/components/galleries/image-card-stacked";
import {BucketItem} from "../../../store/types";
import {GALLERY_BUCKETS} from "@/components/galleries/types";
import "../styles.css";

type BreadGalleryProps = {
  breadObjects: BucketItem[];
}

export default function BreadGallery(props: BreadGalleryProps) {
  const { breadObjects } = props;
  if (!breadObjects) return <div className="woh__bread-loading">Baking those lovely loaves...</div>;

  const groupedAndSorted = groupByRepetition(breadObjects);

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {groupedAndSorted.map((item: any, index: number) => <DisplayedImage key={index} item={item} index={index}/>)}
      </div>
    </div>
  );
}

function DisplayedImage(props: DisplayedImageProps){
  const {item, index} = props;
  return (
    <div className={getClassName(item, index)} key={index}>
      {(Array.isArray(item))
        ? <ImageCardStacked
            bucketItems={item}
            index={index}
            caption={getCaption(item[0])}
            galleryPrefix={GALLERY_BUCKETS.BREAD}
          />
        : <ImageCard
          file={item}
          index={index}
          caption={getCaption(item)}
          galleryPrefix={GALLERY_BUCKETS.BREAD}
        />
      }
    </div>
  );
}

const getCaption = (item: BucketItem) => trimLetterVariant(extractBreadName(item.url));

type DisplayedImageProps = {
  item: any;
  index: number;
}

const getClassName = (item: BucketItem | BucketItem[], index: number) =>
  (Array.isArray(item))
    ? `woh__bread-card-fan woh__fan-${index}`
    : `woh__bread-image-${index}`;

