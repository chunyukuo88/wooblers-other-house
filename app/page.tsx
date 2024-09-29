// import '../styles/global.css'

import ImageGallery from "./images";

export const metadata = {
  title: "App Router",
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Woobler's Other House</h1>
      <ImageGallery />
    </>

  );
}
