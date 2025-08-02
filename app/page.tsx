import { cookies } from 'next/headers';
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
  const cookieStore = await cookies();
  const enabledHowzitFromCookies = cookieStore.get('howzit')?.value === 'true';

  const {showPrivateImages: enableHowzitFromQueryParams} = getFlagsFromParams(howzit);
  const displayPrivateImages = enableHowzitFromQueryParams || enabledHowzitFromCookies;
  const folders = await getMainPageImages(displayPrivateImages);

  return <ImageGallery folders={folders} showPrivateImages={displayPrivateImages}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
