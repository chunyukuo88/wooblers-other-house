import BreadGallery from "@/components/galleries/bread-gallery_DEPRECATED/bread-gallery";
import {getBreadImages} from "../../common/http";

export default async function Page(){
  const breadObjects = await getBreadImages();
  return <BreadGallery breadObjects={breadObjects}/>;
}
