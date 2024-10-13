import ImageGallery from "@/components/image-gallery/image-gallery";

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "Vrooooooom!" : "小巫之另一個屋",
};

export default function Page() {
  console.log(`oink: ${process.env.NEXTAUTH_URL}`);
  return <ImageGallery />;
}
