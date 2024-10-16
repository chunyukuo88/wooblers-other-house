import {BucketItem} from "../../store/types";
import Image from "next/image";
import React from "react";

type ImageCardProps = {
  file: BucketItem;
  index: number;
};

export function ImageCard(props: ImageCardProps) {
  const {file, index} = props;
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
    </div>
  ) : null;
}
