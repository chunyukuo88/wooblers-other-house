import "./bread-caption.css";

type BreadCaptionProps = {
  url: string;
}

const trimLetterVariant = (breadNameWithVariant: string): string => {
  const asArray = breadNameWithVariant.split(" ");
  const endsWithVariantLetter = asArray[asArray.length - 1].length === 1;
  if (endsWithVariantLetter) {
    asArray.pop();
    return asArray.join(" ");
  }
  return asArray.join(" ");
};

export default function BreadCaption(props: BreadCaptionProps){
  const split = props.url.split("/");
  const nameOfBread = split[split.length - 1];
  const removeExtension = nameOfBread.split(".")[0];
  const unifiedDelimiters = removeExtension.replaceAll("-", " ").replaceAll("_", " ");
  const caption = unifiedDelimiters.charAt(0).toUpperCase() + unifiedDelimiters.slice(1);
  const trimmed = trimLetterVariant(caption);

  return <p className="woh__bread-caption">{trimmed}</p>;
}
