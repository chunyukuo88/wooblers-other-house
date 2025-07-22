"use client";
import {useEffect, useState} from "react";
import {useMainImages} from "../../../store";
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import {GALLERY_BUCKETS} from "@/components/galleries/types";
import {ImageCard} from "@/components/galleries/image-card";
import {Folder} from "../../../store/types";
import "../styles.css";

type ImageGalleryProps = {
  folders: Folder[];
}

const ImageGallery = (props: ImageGalleryProps) => {
  const { folders } = props;
  const {currentFolder, updateCurrentFolder, updateFetchedFolders} = useMainImages();
  const [current, setCurrent] = useState<Folder>();
  if (!folders) {
    return <div>Loading ... </div>
  }

  useEffect(() => {
    if (folders?.length > 0) {
      setCurrent(folders[0]);
      updateCurrentFolder(folders[0]);
      updateFetchedFolders(folders);
    }
  }, [folders]);

  useEffect(() => {
    if (currentFolder.name.length > 0) {
      setCurrent(currentFolder);
    }
  }, [currentFolder]);

  if (!current) {
    return null;
  }

  const WrappedButton = () => (
    <div style={{height: "0px"}} className="woh__scroll-to-top-trigger">
      <ScrollToTopButton images={current.photos}/>
    </div>
  );

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {current.photos.map((file: string, index: number) => {
          const caption = current.captions[index];
          return (
            <div className={`woh__image-wrapper-${index}`} key={index}>
              <ImageCard file={file} index={index} caption={caption} galleryPrefix={GALLERY_BUCKETS.MAIN}/>
            </div>
          );
        })}
      </div>
      {(current.photos.length > 0) ? <WrappedButton /> : null}
    </div>
  );
};

export default ImageGallery;