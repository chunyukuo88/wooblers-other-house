"use client"
import React, {useContext, useState, useEffect} from "react";
import {FetchedImagesContext as context} from "../../store/fetched-images-context"
import Image from "next/image";
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import "./image-gallery.css";

interface ImageData {
  url: string;
}

const ImageGallery: React.FC = () => {
  const {updateFetchedImages, fetchedImageObjects} = useContext(context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const imageSource = process.env.NEXT_PUBLIC_IMAGE_SOURCE;
  
  const fetchImages = async () => {
    try {
      // @ts-ignore
      const response = await fetch(imageSource);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      return data.photos;
    } catch (err) {
      setError("Error fetching images. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedImageObjects.length < 1) {
      fetchImages().then(image => {
        updateFetchedImages(image);
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        <ScrollToTopButton />
        {fetchedImageObjects.map((file, index) => {
          // @ts-ignore
          const isImage = file.key.split(".")[1] !== "txt";
          return isImage ? (
          <div key={index} className="woh__image-item">
            <Image
              // @ts-ignore
              src={file.url}
              alt={`Image #${index + 1}`}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default ImageGallery;