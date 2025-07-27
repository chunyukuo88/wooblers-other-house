import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getMainPageImages} from "../common/http";
import {getFlagsFromParams} from "./flags";

type Params = {
  searchParams: Promise<{
    [key: string]: string
  }>
}
export default async function Page({ searchParams }: Params) {
  const {howzit} = await searchParams;
  const {showPrivateImages} = getFlagsFromParams(howzit);
  const folders = await getMainPageImages(showPrivateImages);

  return <ImageGallery folders={folders} showPrivateImages={showPrivateImages}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
