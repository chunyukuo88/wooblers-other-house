import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getMainPageImages} from "../common/http";

export default async function Page() {
  const folders = await getMainPageImages();
  return <ImageGallery folders={folders}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
