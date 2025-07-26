import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getMainPageImages} from "../common/http";
import {getFlagsFromParams} from "./flags";

export default async function Page({ searchParams }: any) {
  const {showPrivateImages} = getFlagsFromParams(searchParams);
  const folders = await getMainPageImages(showPrivateImages);

  return <ImageGallery folders={folders} showPrivateImages={showPrivateImages}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
