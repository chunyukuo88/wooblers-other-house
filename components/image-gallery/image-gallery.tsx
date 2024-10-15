"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./image-gallery.css";

interface ImageData {
  url: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
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
      setImages(data.photos);
    } catch (err) {
      setError("Error fetching images. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
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
        {images.map((image, index) => (
          <div key={index} className="woh__image-item">
            <Image
              src={image.url}
              alt={`Image #${index + 1}`}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;