import {BucketItem} from "../../store/types";
import {calculateStyle} from "@/components/galleries/utils";

type StackedCardProps = {
  bucketItems: BucketItem[],
  index: number,
  caption: string,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {bucketItems, caption, index} = props;
  const clickHandler = () => {};
  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {bucketItems.map((bucketItem, index) => {
          return (
            <div
              onClick={clickHandler}
              style={calculateStyle(bucketItems,index)}
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
