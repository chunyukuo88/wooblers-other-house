import {BucketItem} from "../../store/types";
import Image from "next/image";
import React from "react";

type ImageCardProps = {
  file: BucketItem;
  index: number;
  caption?: string;
};

export function ImageCard(props: ImageCardProps) {
  const {caption, file, index} = props;
  const displayCaption = caption
    ? caption.split("@")[1]
    : "";
  const isImage = file.key.split(".")[1] !== "txt";
  return isImage ? (
    <div key={index} className="woh__image-item">
      <Image
        src={file.url}
        alt={`Image #${index + 1}`}
        width={300}
        height={200}
        layout="responsive"
      />
      <p>{displayCaption}</p>
    </div>
  ) : null;
}
