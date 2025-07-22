import ImageGallery from "@/components/galleries/main-gallery/image-gallery";

export const metadata = {
  //@ts-ignore
  title: process.env.NODE_ENV === "production" ? "🚗 Vrooooooom!" : "小巫之另一個屋",
};

export default async function Page() {
  const imageSource = process.env.NEXT_PUBLIC_IMAGE_SOURCE!;
  const response = await fetch(imageSource);
  const folders = await response.json();
  return <ImageGallery folders={folders}/>;
}
