import {useState} from "react";
import {calculateStyle} from "@/components/galleries/utils";
import {BucketItem} from "../../store/types";

type StackedCardProps = {
  bucketItems: BucketItem[],
  index: number,
  caption: string,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {bucketItems, caption, index} = props;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const clickHandler = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {bucketItems.map((bucketItem, index) => {
          const isActive = (activeIndex === index);
          return (
            <div
              onClick={() => clickHandler(index)}
              style={{
                ...calculateStyle(bucketItems, index),
                zIndex: isActive ? 100 : 0,
              }}
              key={index}
              className="woh__card-fan-member"
            >
              <img
                src={bucketItem.url}
                alt={`Image #${index + 1}`}
                width={280}
                height={"auto"}
              />
            </div>
          );
        })}
      </div>
      <div className="woh__caption-container">
        <div className="woh__caption-under-stacked">{caption}</div>
      </div>
    </>
  )
};
