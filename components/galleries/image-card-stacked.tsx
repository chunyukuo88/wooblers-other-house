import Image from "next/image";
import {BucketItem} from "../../store/types";

type StackedCardProps = {
  arrayOfUrls: BucketItem[],
  index: number,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {arrayOfUrls, index} = props;
  const styles = [
    {transform: "rotate(-25deg) translate(-30px)", position: "absolute"},
    {transform: "rotate(-20deg) translate(-20px)", position: "absolute"},
    {transform: "rotate(-15deg) translate(-10px)", position: "absolute"},
    {transform: "rotate(-10deg)", position: "absolute"},
    {transform: "rotate(-5deg) translate(10px)", position: "absolute"},
    {transform: "rotate(5deg) translate(20px)", position: "absolute"},
    {transform: "rotate(10deg) translate(30px)", position: "absolute"},
    {transform: "rotate(15deg) translate(40px)", position: "absolute"},
  ];

  return (
    <div className="woh__card-fan" key={index}>
      {arrayOfUrls.map((bucketItem, index) => (
        <div className="woh__card-fan-member" style={styles[index]} key={index}>
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
      ))}
    </div>
  )
};