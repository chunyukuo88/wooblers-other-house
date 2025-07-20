"use client";
import {useMainImages} from "../../../store";
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import {ImageCard} from "@/components/galleries/image-card";
import "../styles.css";

const ImageGallery = () => {
  const { fetchedFolders } = useMainImages();

  const firstFolder = fetchedFolders[0];

  if (!firstFolder) {
    return <div>Loading ... </div>
  }

  const WrappedButton = () => (
    <div style={{height: "0px"}} className="woh__scroll-to-top-trigger">
      <ScrollToTopButton images={firstFolder.photos}/>
    </div>
  );

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {firstFolder.photos.map((file: string, index: number) => {
          const caption = firstFolder.captions[index];
          return (
            <div className={`woh__image-wrapper-${index}`} key={index}>
              <ImageCard file={file} index={index} caption={caption}/>
            </div>
          );
        })}
      </div>
      {(firstFolder.photos.length > 0) ? <WrappedButton /> : null}
    </div>
  );
};

export default ImageGallery;