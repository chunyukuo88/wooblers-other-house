"use client"
import React, {useContext, useState, useEffect} from "react";
import {FetchedImagesContext as context} from "../../store/fetched-images-context"
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import {ImageCard} from "@/components/image-gallery/image-card";
import {BucketItem} from "../../store/types";
import "./image-gallery.css";

const imageSource = process.env.NEXT_PUBLIC_IMAGE_SOURCE;

const ImageGallery: React.FC = () => {
  const {
    updateFetchedImages,
    fetchedImageObjects,
    updateFetchedCaptions,
    fetchedCaptionStrings,
  } = useContext(context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      // @ts-ignore
      const response = await fetch(imageSource);
      if (!response.ok) {
        return new Error("Failed to fetch images");
      }
      return await response.json();
    } catch (err) {
      setError("Error fetching images. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages().then(data => {
      updateFetchedImages(data.photos);
      data.captions.pop();
      updateFetchedCaptions(data.captions);
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const WrappedButton = () => (
    <div style={{height: "0px"}} className="woh__scroll-to-top-trigger">
      <ScrollToTopButton/>
    </div>
  );

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {fetchedImageObjects.map((file: BucketItem, index: number) => {
          const caption = fetchedCaptionStrings[index];
          return (
            <div>
              <ImageCard file={file} index={index} caption={caption}/>
            </div>
          );
        })}
      </div>
      {(fetchedImageObjects.length > 0) ? <WrappedButton /> : null}
    </div>
  );
};

export default ImageGallery;