import {extractBreadName, trimLetterVariant} from "@/components/galleries/bread-gallery/utils";

type BreadCaptionProps = {
  url: string;
}

export default function BreadCaption(props: BreadCaptionProps){
  const breadName = extractBreadName(props.url);
  const caption = trimLetterVariant(breadName);

  return <p className="woh__bread-caption">{caption}</p>;
}
