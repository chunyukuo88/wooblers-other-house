import Image from "next/image";

type StackedCardProps = {
  arrayOfUrls: string[],
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

  console.log("arrayOfUrls");
  console.dir(arrayOfUrls);
  return (
    <div className="woh__card-fan">
      {arrayOfUrls.map((url, index) => (
        <div className="woh__card-fan-member" style={styles[index - 1]}>
          <Image
            src={url}
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