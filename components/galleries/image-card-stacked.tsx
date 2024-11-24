import Image from "next/image";
import {BucketItem} from "../../store/types";

type StackedCardProps = {
  arrayOfUrls: BucketItem[],
  index: number,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {arrayOfUrls, index} = props;
  return (
    <div className="woh__card-fan" key={index}>
      {arrayOfUrls.map((bucketItem, index) => {
        const rotationBase = -25;
        const translationBase = -30;
        const style = {
          transform: `rotate(${rotationBase + (5*index)}deg) translate(${translationBase + (5*index)}px)`,
          position: "absolute"
        };
        return (
          <div className="woh__card-fan-member" style={style} key={index}>
            <Image
              src={bucketItem.url}
              alt={`Image #${index + 1}`}
              width={270}
              height={180}
              placeholder="blur"
              blurDataURL="/images/image_placeholder.png"
              layout="intrinsic"
            />
          </div>
        )
      })}
    </div>
  )
};