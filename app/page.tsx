import ImageGallery from "@/components/image-gallery/image-gallery";

export const metadata = {
  title: process.env.NODE_ENV === "production" ? "Vrooooooom!" : "小巫之另一個屋",
};

export default function Page() {
  console.log(`REGION: ${process.env.REGION}`);
  console.log(`USER_POOL_WEB_CLIENT_ID: ${process.env.USER_POOL_WEB_CLIENT_ID}`);
  console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);
  return <ImageGallery />;
}
