import {BucketItem} from "../../store/types";
import Image from "next/image";

export type ImageCardProps = {
  file: BucketItem;
  index: number;
  caption?: string;
  layoutType?: string;
};

export function processRawCaption(rawCaption: string):string {
  return rawCaption.split("@")[1];
}

export function ImageCard(props: ImageCardProps) {
  const {caption, file, index, layoutType} = props;
  const displayCaption = caption
    ? processRawCaption(caption)
    : "";
  return (
    <div
      data-testid="image-item"
      key={index}
      className={`woh__image-item woh__image-index-${index}`}
    >
      <Image
        src={file.url}
        alt={`Image #${index + 1}`}
        width={300}
        height={200}
        placeholder="blur"
        blurDataURL="/images/image_placeholder.png"
        layout={layoutType || "intrinsic"}
      />
      {displayCaption
        ? <p data-testid="display-caption">{displayCaption}</p>
        : null
      }
    </div>
  );
}
