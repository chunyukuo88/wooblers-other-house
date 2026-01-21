import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getFolders} from "./utils";

export const dynamic = "force-dynamic";

type Params = {
  searchParams: Promise<{
    [key: string]: string
  }>
}
export default async function Page({ searchParams }: Params) {
  const params = await searchParams;
  const privateImageQuery = params[process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!];
  const {displayPrivateImages, folders} = await getFolders(privateImageQuery);

  return (
      <>
        <ImageGallery folders={folders} showPrivateImages={displayPrivateImages}/>
      </>
  );
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
