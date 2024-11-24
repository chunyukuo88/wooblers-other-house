import Image from "next/image";
import {BucketItem} from "../../store/types";

type StackedCardProps = {
  arrayOfUrls: BucketItem[],
  index: number,
  caption: string,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {arrayOfUrls, caption, index} = props;
  const rotationBase = -25;

  const calculateStyle = (i: number) => {
    const rotation = (i === 1) ? 15 : -15;
    return (arrayOfUrls.length === 2)
      ? { transform:  `rotate(${rotation}deg)`}
      : { transform: `rotate(${rotationBase + (9*index)}deg)`};
  };

  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {arrayOfUrls.map((bucketItem, index) => {
          return (
            <div className="woh__card-fan-member" style={calculateStyle(index)} key={index}>
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
      <p className="woh__caption">{caption}</p>
    </>
  )
};