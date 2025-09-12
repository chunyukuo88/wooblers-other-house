import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getFolders} from "@/components/navigation/utils";

type Params = {
  searchParams: Promise<{
    [key: string]: string
  }>
}
export default async function Page({ searchParams }: Params) {
  const {howzit} = await searchParams;
  const {displayPrivateImages, folders} = await getFolders(howzit);

  return (
      <>
        <ImageGallery folders={folders} showPrivateImages={displayPrivateImages}/>
      </>
  );
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
