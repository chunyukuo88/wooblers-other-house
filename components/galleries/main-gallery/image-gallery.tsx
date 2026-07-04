'use client';
import { lazy, useEffect, useState } from 'react';
import { useMainImages } from '../../../store';
import { ImageCard } from '@/components/galleries/image-card';
import { emptyFolder, Folder } from 'store/fetched-images/types';
import { getIntersectionObserver } from '@/components/navigation/components/scroll-to-top-button/utils';
import '../styles.css';
import { useColors } from '../../../store/background-color/context';

const ScrollToTopButton = lazy(() => import('../../navigation/components/scroll-to-top-button'));

type ImageGalleryProps = {
  folders: Folder[];
  showPrivateImages: boolean;
};

const ImageGallery = (props: ImageGalleryProps) => {
  const { folders, showPrivateImages } = props;
  const { currentFolder, updateFetchedFolders } = useMainImages();
  const { red, green, blue } = useColors();

  const [current, setCurrent] = useState<Folder>(emptyFolder);
  const [wooblerIsVisible, setWooblerIsVisible] = useState(false);

  useEffect(() => {
    const observer = getIntersectionObserver(setWooblerIsVisible);
    const numberOfImages = current?.photos.length;
    const lastImage = `.woh__image-index-${(numberOfImages && numberOfImages - 1) || 'final'}`;
    const trigger = document.querySelector(lastImage)!;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => observer.disconnect();
  }, [current]);

  useEffect(() => {
    if (showPrivateImages) {
      document.cookie = `${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY}=${process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_VAL}; path=/;`;
    }
  }, [showPrivateImages]);

  const bucketAlias = showPrivateImages ? 'private' : 'public';

  useEffect(() => {
    if (folders?.length > 0) {
      setCurrent(folders[0]);
      updateFetchedFolders(folders);
    }
  }, [folders]);

  useEffect(() => {
    if (currentFolder.name.length > 0) {
      setCurrent(currentFolder);
    }
  }, [currentFolder]);

  if (!folders || !current) {
    return <div>Loading ... </div>;
  }

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {current.photos.map((file: string, index: number) => {
          const caption = current.captions[index];
          return (
            <div
              className={`woh__image-wrapper-${index}`}
              key={index}
              style={{ background: `rgb(${red} ${green} ${blue})` }}
            >
              <ImageCard file={file} index={index} caption={caption} bucketAlias={bucketAlias} />
            </div>
          );
        })}
      </div>
      <div style={{ height: '0px' }}>{wooblerIsVisible ? <ScrollToTopButton /> : null}</div>
    </div>
  );
};

export default ImageGallery;
