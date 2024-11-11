import {BucketItem} from "../../store/types";
import Image from "next/image";
import React from "react";

export type ImageCardProps = {
  file: BucketItem;
  index: number;
  caption?: string;
};

export function processRawCaption(rawCaption: string):string {
  return rawCaption.split("@")[1];
}

export function ImageCard(props: ImageCardProps) {
  const {caption, file, index} = props;
  const displayCaption = caption
    ? processRawCaption(caption)
    : "";
  const isImage = file.key.split(".")[1] !== "txt";
  return isImage ? (
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
        layout="responsive"
      />
      {displayCaption
        ? <p data-testid="display-caption">{displayCaption}</p>
        : null
      }
    </div>
  ) : null;
}
