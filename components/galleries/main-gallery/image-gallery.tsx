"use client";
import {lazy, useEffect, useState} from "react";
import {useMainImages} from "../../../store";
import {ImageCard} from "@/components/galleries/image-card";
import {Folder} from "../../../store/types";
import "../styles.css";

const ScrollToTopButton = lazy(() => import("../../navigation/components/scroll-to-top-button"));

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
    // const [isVisible, setIsVisible] = useState(false);
    //
    // useEffect(() => {
    //   const observer = getIntersectionObserver(setIsVisible);
    //   const numberOfImages = images.length;
    //   const lastImage = `.woh__image-index-${numberOfImages - 1}`;
    //   const trigger = document.querySelector(lastImage)!;
    //   if (trigger) {
    //     observer.observe(trigger);
    //   }
    //
    //   return () => observer.disconnect();
    // }, [images]);

  useEffect(() => {
    if (showPrivateImages) {
      document.cookie = `${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY}=${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL}; path=/;`;
    }
  }, [showPrivateImages]);

  const bucketAlias = showPrivateImages ? 'private' : 'public';

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

    console.log('gallery');
  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {current.photos.map((file: string, index: number) => {
          const caption = current.captions[index];
          return (
            <div className={`woh__image-wrapper-${index}`} key={index}>
              <ImageCard file={file} index={index} caption={caption} bucketAlias={bucketAlias}/>
            </div>
          );
        })}
      </div>
      {(current.photos.length > 8) ? <ScrollToTopButton /> : null}
    </div>
  );
};

export default ImageGallery;