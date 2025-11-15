"use client";
import {useEffect, useState} from "react";
import {useMainImages} from "../../../store";
import ScrollToTopButton from "@/components/navigation/components/scroll-to-top-button";
import {GALLERY_BUCKETS} from "@/components/galleries/types";
import {ImageCard} from "@/components/galleries/image-card";
import {Folder} from "../../../store/types";
import "../styles.css";

type ImageGalleryProps = {
  folders: Folder[];
  showPrivateImages: boolean;
}

const ImageGallery = (props: ImageGalleryProps) => {
  const { folders, showPrivateImages } = props;
  const {currentFolder, updateCurrentFolder, updateFetchedFolders} = useMainImages();
  const [current, setCurrent] = useState<Folder>();
  if (!folders) {
    return <div>Loading ... </div>
  }

  useEffect(() => {
    if (showPrivateImages) {
      document.cookie = `${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY}=${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL}; path=/;`;
    }
  }, [showPrivateImages]);

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
  const galleryPrefix = showPrivateImages
    ? GALLERY_BUCKETS.MAIN_PRIVATE
    : GALLERY_BUCKETS.MAIN_PUBLIC;

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {current.photos.map((file: string, index: number) => {
          const caption = current.captions[index];
          return (
            <div className={`woh__image-wrapper-${index}`} key={index}>
              <ImageCard file={file} index={index} caption={caption} galleryPrefix={galleryPrefix}/>
            </div>
          );
        })}
      </div>
      {(current.photos.length > 0) ? <WrappedButton /> : null}
    </div>
  );
};

export default ImageGallery;