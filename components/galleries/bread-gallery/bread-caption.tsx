type BreadCaptionProps = {
  url: string;
}

export const trimLetterVariant = (breadNameWithVariant: string): string => {
  const asArray = breadNameWithVariant.split(" ");
  const endsWithVariantLetter = asArray[asArray.length - 1].length === 1;
  if (endsWithVariantLetter) {
    asArray.pop();
    return asArray.join(" ");
  }
  return asArray.join(" ");
};

export function extractBreadName(url: string): string {
  const split = url.split("/");
  const nameOfBread = split[split.length - 1];
  const removeExtension = nameOfBread.split(".")[0];
  const unifiedDelimiters = removeExtension.replaceAll("-", " ").replaceAll("_", " ");
  return unifiedDelimiters.charAt(0).toUpperCase() + unifiedDelimiters.slice(1);
}

export default function BreadCaption(props: BreadCaptionProps){
  const breadName = extractBreadName(props.url);
  const caption = trimLetterVariant(breadName);

  return <p className="woh__bread-caption">{caption}</p>;
}
