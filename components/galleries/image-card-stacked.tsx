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
  const defaultActiveIndex = bucketItems.length - 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActiveIndex);

  const clickHandler = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const indexDecrementer = () => (activeIndex === 0)
    ? setActiveIndex(bucketItems.length - 1)
    // @ts-ignore
    : setActiveIndex(activeIndex - 1);

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
      <div className="woh__bread-caption-container">
        <button onClick={indexDecrementer}>O</button>
        <div className="woh__caption-under-stacked">{caption}</div>
      </div>
    </>
  )
};
