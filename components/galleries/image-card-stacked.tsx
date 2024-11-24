import Image from "next/image";
import {BucketItem} from "../../store/types";

type StackedCardProps = {
  arrayOfUrls: BucketItem[],
  index: number,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {arrayOfUrls, index} = props;
  const styles = [
    {transform: "rotate(-25deg)", position: "absolute"},
    {transform: "rotate(-20deg)", position: "absolute"},
    {transform: "rotate(-15deg)", position: "absolute"},
    {transform: "rotate(-10deg)", position: "absolute"},
    {transform: "rotate(-5deg)", position: "absolute"},
    {transform: "rotate(0deg)", position: "absolute"},
    {transform: "rotate(5deg)", position: "absolute"},
    {transform: "rotate(10deg)", position: "absolute"},
  ];

  return (
    <div className="woh__card-fan">
      {arrayOfUrls.map((bucketItem, index) => (
        <div className="woh__card-fan-member" style={styles[index - 1]}>
          <Image
            src={bucketItem.url}
            alt={`Image #${index + 1}`}
            width={240}
            height={160}
            placeholder="blur"
            blurDataURL="/images/image_placeholder.png"
            layout="intrinsic"
          />
        </div>
      ))}
    </div>
  )
};