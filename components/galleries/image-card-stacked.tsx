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

    if (arrayOfUrls.length === 2) {
      const rotation = (i === 1) ? 15 : -15;
      return { transform:  `rotate(${rotation}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
    if (arrayOfUrls.length === 3) {
      const rotations = [-15, 1, 15];
      return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
    if (arrayOfUrls.length === 4) {
      const rotations = [-15, -5, 5, 15];
      return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
    if (arrayOfUrls.length === 5) {
      const rotations = [-15, -5, 0, 5, 15];
      return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
    if (arrayOfUrls.length === 6) {
      const rotations = [-20, -10, -5, 5, 10, 20];
      return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
    if (arrayOfUrls.length === 7) {
      const rotations = [-20, -10, -5, 0, 5, 10, 20];
      return { transform:  `rotate(${rotations[i]}deg)`, marginRight: "-200px", justifySelf: "center" };
    }
  };

  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {arrayOfUrls.map((bucketItem, index) => {
          return (
            <div className="woh__card-fan-member" style={calculateStyle(index)} key={index}>
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
