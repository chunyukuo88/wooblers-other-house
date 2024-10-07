"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
  url: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bucket = "https://7903vki5qk.execute-api.us-east-1.amazonaws.com/dev/src/getImagesAll";
  
  const fetchImages = async () => {
    try {
      const response = await fetch(bucket);
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
    <div className="image-gallery">
      <h1>Image Gallery</h1>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item hover:cursor-pointer">
            <Image
              src={image.url}
              alt={`Image ${index + 1}`}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .image-gallery {
          padding: 20px;
        }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .image-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;