import {BucketItem} from "../../store/types";
import {calculateStyle} from "@/components/galleries/utils";

type StackedCardProps = {
  arrayOfUrls: BucketItem[],
  index: number,
  caption: string,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {arrayOfUrls, caption, index} = props;

  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {arrayOfUrls.map((bucketItem, index) => {
          return (
            <div className="woh__card-fan-member" style={calculateStyle(arrayOfUrls,index)} key={index}>
              <img
                src={bucketItem.url}
                alt={`Image #${index + 1}`}
                width={270}
                height={"auto"}
              />
            </div>
          );
        })}
      </div>
      <p className="woh__caption">{caption}</p>
    </>
  )
};
