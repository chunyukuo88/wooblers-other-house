import ImageGallery from "@/components/galleries/main-gallery/image-gallery";
import {getMainPageImages} from "../common/http";
import {howzitFlag} from "../flags";

export default async function Page() {
  const isHowzit = await howzitFlag();
  const folders = await getMainPageImages();

  return isHowzit
    ? <div>crunchy woozle</div>
    : <ImageGallery folders={folders}/>;
}

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};
