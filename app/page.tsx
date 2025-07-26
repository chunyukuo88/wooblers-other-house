import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getMainPageImages} from "../common/http";
import {getFlagsFromParams, SearchParams} from "./flags";

export default async function Page({ searchParams }: SearchParams) {
  const {showPrivateImages} = getFlagsFromParams(searchParams as unknown as SearchParams);
  const folders = await getMainPageImages(showPrivateImages);

  return <ImageGallery folders={folders}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
